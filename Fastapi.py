from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
import os
from langserve import add_routes
from dotenv import load_dotenv

load_dotenv()

os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")
llm = ChatGroq(model='Gemma2-9b-It')

prompt = ChatPromptTemplate(
    [
        ("system", "Translate the text only into {language}"),
        ('user', "{question}")
    ]
)

parser = StrOutputParser()

chain = prompt | llm | parser

app = FastAPI(title="Langchain Server",
              version="1.0",
              description="A simple API server Using langchain Runnable interface")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],  # Allow all headers
)

# Adding chain routes
add_routes(app, chain, path="/chain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
