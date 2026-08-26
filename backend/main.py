"""
FastAPI Server for ShikshaSetu AI Antigravity Agent Backend
Exposes SSE Streaming endpoints for real-time thought, tool-call, and token delivery.
Supports both unified single-service cloud deployments and decoupled cross-origin deployments.
"""

import os
import json
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from agent_system import ShikshaMultiAgentSystem

app = FastAPI(
    title="ShikshaSetu AI Agent API",
    description="Multi-Agent Socratic & Vernacular Education Engine powered by Google Antigravity",
    version="1.0.0"
)

# Configure CORS Origins
cors_origins_env = os.getenv("CORS_ORIGINS", "")
if cors_origins_env.strip():
    allowed_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
else:
    # Default allowed origins: local dev + GitHub Pages + wildcard for development
    allowed_origins = [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://pradeepchinige09.github.io",
        "https://shikshasetu-ai-beta.vercel.app"
    ]

# If running in non-strict development mode or explicitly requested, allow wildcard
if os.getenv("ENVIRONMENT") != "production" and "*" not in allowed_origins:
    allowed_origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_system = ShikshaMultiAgentSystem()

class ChatRequest(BaseModel):
    message: str
    topic_id: str = "optics-prism"
    lang: str = "hi"
    api_key: str = None

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "ShikshaSetu AI Multi-Agent API",
        "framework": "Google Antigravity SDK",
        "supported_languages": ["en", "hi", "hinglish", "te", "ta", "mr"]
    }

@app.post("/api/agent/stream")
async def stream_agent_chat(req: ChatRequest):
    """
    Streams Agent Thought chain, subagent handoffs, and tokens via Server-Sent Events (SSE)
    """
    async def event_generator():
        async for event in agent_system.stream_chat(
            user_message=req.message,
            topic_id=req.topic_id,
            lang=req.lang
        ):
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "ShikshaSetu AI Multi-Agent API",
        "framework": "Google Antigravity SDK",
        "supported_languages": ["en", "hi", "hinglish", "te", "ta", "mr"]
    }

# Optional Static Frontend Support (Activated when SERVE_FRONTEND=true)
SERVE_FRONTEND = os.getenv("SERVE_FRONTEND", "false").lower() in ("true", "1")
dist_dir = Path(__file__).resolve().parent.parent / "dist"
if SERVE_FRONTEND and dist_dir.exists():
    assets_dir = dist_dir / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/app/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = dist_dir / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(dist_dir / "index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=False)
