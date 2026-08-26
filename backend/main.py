"""
FastAPI Server for ShikshaSetu AI Antigravity Agent Backend
Exposes SSE Streaming endpoints for real-time thought, tool-call, and token delivery.
"""

import json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent_system import ShikshaMultiAgentSystem

app = FastAPI(
    title="ShikshaSetu AI Agent API",
    description="Multi-Agent Socratic & Vernacular Education Engine powered by Google Antigravity",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "ShikshaSetu AI Multi-Agent API",
        "framework": "Google Antigravity SDK",
        "supported_languages": ["en", "hi", "hinglish", "te", "ta", "mr"]
    }

@app.post("/api/agent/stream")
async def stream_agent_chat(req: ChatRequest):
    """
    Streams Agent Thought chain, subagent handoffs, and tokens via SSE
    """
    async def event_generator():
        async for event in agent_system.stream_chat(
            user_message=req.message,
            topic_id=req.topic_id,
            lang=req.lang
        ):
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import os
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port)

