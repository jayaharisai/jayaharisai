/**
 * WORK DATA
 * ----------
 * This file holds the **real** project data that appears in the UI.
 *
 * For the data shape, all field documentation, and a copy-paste template,
 * see `data/_samples.ts` (the SAMPLE_WORK constant).
 */

import type { WorkItem } from "./_samples";

// Re-export the type so existing imports from this file keep working
export type { WorkItem } from "./_samples";

export const WORK_DATA: WorkItem[] = [
  {
    id: 1,
    title: "MLOps Platform (MLAngels)",
    description: "A platform to automate full ML lifecycle — training, deployment, monitoring with one-click workflow system.",
    blog: ["MLOps", "Python", "FastAPI", "Docker"],
    details: [
      "Automated full ML lifecycle with one-click training, deployment, and monitoring workflows.",
      "Built scalable REST APIs with FastAPI for model management and experiment tracking.",
      "Integrated Docker containerization for reproducible training and serving environments.",
      "Implemented model versioning, registry, and rollback capabilities for production safety."
    ],
    date: "2024",
    author: "Jayaharisai",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1",
    github: "#",
    tags: ["MLOps", "Python", "FastAPI", "Docker", "Kubernetes"],
    longDescription: `
      <p>MLAngels is a comprehensive MLOps platform designed to streamline the entire machine learning lifecycle. From data preparation to model deployment and monitoring, it provides a unified interface for data scientists and ML engineers.</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>One-Click Training:</strong> Automate model training pipelines with configurable hyperparameters.</li>
        <li><strong>Automated Deployment:</strong> Deploy models to production with a single click, with automatic rollback on failure.</li>
        <li><strong>Monitoring Dashboard:</strong> Real-time metrics on model performance, data drift, and system health.</li>
        <li><strong>Model Registry:</strong> Version control for models with full lineage tracking.</li>
      </ul>

      <h2>Architecture</h2>
      <p>Built with Python and FastAPI on the backend, containerized with Docker, and orchestrated on Kubernetes. The platform integrates with MLflow for experiment tracking and supports multiple deployment targets including AWS SageMaker and on-premise clusters.</p>
    `
  },
  {
    id: 2,
    title: "LLMOps System",
    description: "End-to-end LLM pipeline for agentic AI systems including fine-tuning, orchestration, and deployment.",
    blog: ["LLMOps", "LangChain", "LangGraph", "RAG"],
    details: [
      "Built end-to-end LLM pipeline supporting fine-tuning, RAG, and agent orchestration.",
      "Fine-tuned LLaMA 3.3 and Mistral models on AWS EC2 with 900+ concurrent request capacity.",
      "Implemented multi-technique fine-tuning including LoRA, QLoRA, and full fine-tuning strategies.",
      "Integrated LangGraph for complex multi-step agent workflows with human-in-the-loop checkpoints."
    ],
    date: "2024-2025",
    author: "Jayaharisai",
    image: "https://images.pexels.com/photos/18069224/pexels-photo-18069224.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1",
    github: "#",
    tags: ["LLMOps", "LangChain", "LangGraph", "RAG", "AWS"],
    longDescription: `
      <p>The LLMOps System is a production-grade platform for managing the full lifecycle of Large Language Models — from fine-tuning to deployment and monitoring.</p>

      <h2>Capabilities</h2>
      <ul>
        <li><strong>Fine-tuning Pipeline:</strong> Support for LoRA, QLoRA, and full fine-tuning of LLaMA 3.3 and Mistral models.</li>
        <li><strong>RAG Infrastructure:</strong> Integrated vector database with document chunking, retrieval, and re-ranking.</li>
        <li><strong>Agent Orchestration:</strong> LangGraph-based multi-step agent workflows with tool use and memory.</li>
        <li><strong>Production Serving:</strong> Deployed on AWS EC2 with auto-scaling, achieving 900+ concurrent requests.</li>
      </ul>

      <h2>Performance</h2>
      <p>The system was optimized for low-latency inference using quantization (GPTQ, AWQ) and vLLM serving, achieving sub-200ms response times for most queries under load.</p>
    `
  },
  {
    id: 3,
    title: "Enterprise AI Tools Suite",
    description: "AI-powered enterprise tools including HR Query Bot, Developer Debugging Assistant, and Meeting Notes Automation.",
    blog: ["AI", "RAG", "LangChain", "Enterprise"],
    details: [
      "Developed HR Query Bot using RAG for instant employee policy and HR information retrieval.",
      "Built Developer Debugging Assistant that analyzes error logs and suggests fixes using LLMs.",
      "Created Meeting Notes Automation system that transcribes, summarizes, and action-items meetings.",
      "Implemented Jira Retrieval System for natural language querying of project management data."
    ],
    date: "2024-2025",
    author: "Jayaharisai",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1",
    github: "#",
    tags: ["AI", "RAG", "LangChain", "FastAPI"],
    longDescription: `
      <p>A suite of AI-powered enterprise tools designed to improve productivity across different teams within an organization.</p>

      <h2>Tools</h2>
      <ul>
        <li><strong>HR Query Bot:</strong> RAG-based system that answers employee questions about policies, benefits, and procedures by retrieving from HR documentation.</li>
        <li><strong>Developer Debugging Assistant:</strong> Integrates with error monitoring systems to analyze stack traces and suggest fixes using LLM-powered code analysis.</li>
        <li><strong>Meeting Notes Automation:</strong> Connects to meeting platforms, transcribes discussions, generates summaries, and extracts action items automatically.</li>
        <li><strong>Jira Retrieval System:</strong> Natural language interface for querying Jira tickets, sprint progress, and project metrics.</li>
      </ul>

      <h2>Architecture</h2>
      <p>All tools built on a shared RAG infrastructure with LangChain orchestration, vector embeddings for retrieval, and FastAPI microservices deployed on Kubernetes.</p>
    `
  },
  {
    id: 4,
    title: "Agentic AI Platform (Prent)",
    description: "Enterprise AI agents and intelligent automation platform using Azure AI Foundry and LangChain.",
    blog: ["Agentic AI", "Azure", "LangGraph", "Automation"],
    details: [
      "Developing enterprise AI agents using Azure AI Foundry, LangChain, LangGraph, and Azure SDK.",
      "Automated AI agent development with code-driven workflows for versioning and configuration management.",
      "Implemented observability and behavioral tracing for production AI agent monitoring.",
      "Built multi-agent systems for complex enterprise automation workflows."
    ],
    date: "2025",
    author: "Jayaharisai",
    image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600&dpr=1",
    github: "#",
    tags: ["Agentic AI", "Azure", "LangGraph", "Multi-Agent"],
    longDescription: `
      <p>An enterprise-grade Agentic AI platform built on Azure AI Foundry that enables organizations to design, deploy, and monitor intelligent AI agents for complex automation tasks.</p>

      <h2>Key Innovations</h2>
      <ul>
        <li><strong>Code-Driven Agent Development:</strong> Replaced manual configuration with programmatic agent definitions for better version control and reproducibility.</li>
        <li><strong>Multi-Agent Orchestration:</strong> Coordinated multiple specialized agents working together on complex workflows with delegation and consensus.</li>
        <li><strong>Observability:</strong> Comprehensive tracing and monitoring of agent decisions, tool usage, and reasoning chains.</li>
        <li><strong>Azure Integration:</strong> Deep integration with Azure AI Foundry, Azure SDK, and Bedrock for enterprise-grade infrastructure.</li>
      </ul>
    `
  }
];