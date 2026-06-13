export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  tooltip: string;
}

export interface RoadmapResource {
  label: string;
  type: "Documentation" | "Video" | "Practice";
  url: string;
}

export interface RoadmapProject {
  title: string;
  description: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  summary: string;
  description: string;
  level: "Start here" | "Foundation" | "Intermediate" | "Advanced";
  duration: string;
  skills: string[];
  projects: RoadmapProject[];
  resources: RoadmapResource[];
}

export interface RoadmapSkillGuide {
  what: string;
  why: string;
  where: string;
}

export interface RoadmapTopicSupplement {
  topicId: string;
  tools: string[];
  outcomes: string[];
}

export interface RoadmapStage {
  id: string;
  index: string;
  title: string;
  description: string;
  topics: RoadmapTopic[];
}

export interface RoadmapDetail {
  roadmapId: string;
  intro: string;
  startTopicId: string;
  stages: RoadmapStage[];
}

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Master Python for backend, data, and automation",
    tooltip:
      "Deep dive into Python internals, async/await, FastAPI, pytest, typing system, design patterns, packaging, and performance optimization.",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description: "Build scalable data pipelines and infrastructure",
    tooltip:
      "Learn Apache Spark, Airflow, dbt, Kafka, data warehousing with Snowflake/BigQuery, ETL/ELT patterns, data modeling, and orchestration at scale.",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Build intelligent systems that learn from data",
    tooltip:
      "Cover supervised & unsupervised learning, regression, classification, clustering, ensemble methods, feature engineering, model evaluation, and scikit-learn.",
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Master neural networks for vision, audio, and sequence data",
    tooltip:
      "Learn CNNs, RNNs, LSTMs, transformers, autoencoders, GANs, transfer learning, PyTorch, TensorFlow, and GPU-accelerated training.",
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    description: "Teach machines to understand, generate, and process human language",
    tooltip:
      "Cover text preprocessing, word embeddings, sequence models, transformers, BERT, GPT, NER, sentiment analysis, machine translation, and text generation.",
  },
  {
    id: "llm",
    title: "Large Language Models",
    description: "Build and deploy production-grade LLM applications",
    tooltip:
      "Master transformer architecture, pre-training, fine-tuning, RLHF, RAG pipelines, prompt engineering, vector databases, model evaluation, safety, and deployment.",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    description: "Design autonomous AI agents that plan, reason, and act",
    tooltip:
      "Learn agent architectures, reasoning & planning, tool use, function calling, multi-agent systems, memory, LangChain, AutoGPT, CrewAI, and production agent deployment.",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    description: "Design and deploy intelligent AI systems at scale",
    tooltip:
      "Cover LLMs, RAG pipelines, embeddings, vector databases (Pinecone/Weaviate), fine-tuning, prompt engineering, MLOps, model evaluation, and full-stack AI systems.",
  },
];

export const ROADMAP_SKILL_GUIDES: Record<string, RoadmapSkillGuide> = {
  "variables-data-types": {
    what: "The basic containers and shapes of data in Python: strings, numbers, booleans, lists, dictionaries, tuples, and sets.",
    why: "Every program is data plus behavior. If you model data cleanly, the rest of the application becomes simpler to reason about.",
    where: "Used in scripts, APIs, ETL jobs, validation layers, configs, and every backend service.",
  },
  "loops-conditions": {
    what: "Control-flow tools that let a program make decisions and repeat work.",
    why: "They turn static code into logic that can react to users, files, API responses, and changing business rules.",
    where: "Used in data validation, batch processing, automation scripts, API logic, and workflow orchestration.",
  },
  functions: {
    what: "Reusable blocks of behavior with clear inputs and outputs.",
    why: "Functions reduce duplication, make code testable, and help teams reason about one small behavior at a time.",
    where: "Used in every production Python codebase: utilities, route handlers, data transforms, validators, and tests.",
  },
  "modules-imports": {
    what: "A way to split Python code into files and packages that can be imported where needed.",
    why: "Without modules, projects become one large script. Modules create boundaries and help teams scale codebases.",
    where: "Used in backend services, Python packages, CLI tools, shared utilities, and deployable applications.",
  },
  "exception-handling": {
    what: "Python's structured way to handle errors using try, except, finally, and custom exceptions.",
    why: "Production code must fail clearly. Good error handling prevents silent data loss and confusing crashes.",
    where: "Used around file access, API calls, database writes, pipeline jobs, and external service integrations.",
  },
  "file-io": {
    what: "Reading from and writing to files such as text, CSV, JSON, logs, and binary assets.",
    why: "Files are the simplest persistence layer and the starting point for many ETL and automation workflows.",
    where: "Used in reporting jobs, config loading, data ingestion, logs, exports, and local tooling.",
  },
  "file-i-o": {
    what: "Reading from and writing to files such as text, CSV, JSON, logs, and binary assets.",
    why: "Files are the simplest persistence layer and the starting point for many ETL and automation workflows.",
    where: "Used in reporting jobs, config loading, data ingestion, logs, exports, and local tooling.",
  },
  "classes-objects": {
    what: "A way to group state and behavior into reusable objects.",
    why: "Classes help model real business concepts and keep related behavior together when procedural code becomes messy.",
    where: "Used in domain models, service classes, SDK clients, database repositories, and framework internals.",
  },
  inheritance: {
    what: "A way for one class to reuse or specialize behavior from another class.",
    why: "It can reduce duplication, but should be used carefully because composition is often clearer.",
    where: "Used in framework extension points, custom exceptions, plugin systems, and shared base models.",
  },
  polymorphism: {
    what: "Different objects exposing the same interface so code can work with them interchangeably.",
    why: "It lets systems stay flexible: swap implementations without rewriting the calling code.",
    where: "Used in payment providers, storage adapters, model providers, notification channels, and strategy patterns.",
  },
  encapsulation: {
    what: "Keeping internal details hidden behind a clean public interface.",
    why: "It protects the rest of the codebase from accidental coupling and makes change safer.",
    where: "Used in service layers, SDKs, database access, domain objects, and reusable libraries.",
  },
  abstraction: {
    what: "A simplified interface over complex internal behavior.",
    why: "Good abstractions let users and teams work with intent instead of implementation details.",
    where: "Used in APIs, repositories, model wrappers, pipeline operators, and platform tooling.",
  },
  decorators: {
    what: "Functions that wrap other functions or classes to add behavior.",
    why: "They keep cross-cutting logic like auth, retries, logging, caching, and timing out of core business code.",
    where: "Used heavily in FastAPI routes, Flask/Django views, pytest fixtures, caching, and observability.",
  },
  generators: {
    what: "Lazy iterators that yield values one at a time instead of building everything in memory.",
    why: "They make data processing more memory-efficient and cleaner for streams or large files.",
    where: "Used in file processing, pagination, streaming APIs, ETL pipelines, and large dataset transformations.",
  },
  iterators: {
    what: "Objects that produce a sequence of values using Python's iteration protocol.",
    why: "They make custom data traversal predictable and composable.",
    where: "Used in data loaders, streaming processors, batch jobs, parsers, and SDK pagination.",
  },
  "context-managers": {
    what: "Objects used with `with` to safely acquire and release resources.",
    why: "They prevent leaks and make cleanup reliable even when errors occur.",
    where: "Used for files, database sessions, locks, transactions, temporary resources, and test fixtures.",
  },
  "lambda-functional-tools": {
    what: "Small functional helpers such as lambda, map, filter, reduce, and comprehensions.",
    why: "They can make simple transformations concise, but should stay readable.",
    where: "Used in data transforms, sorting keys, quick predicates, and pipeline-style operations.",
  },
  "arrays-linked-lists": {
    what: "Core linear data structures used to store ordered values.",
    why: "Understanding them builds intuition for memory, access time, insertion cost, and algorithm choices.",
    where: "Used in interviews, parsers, queues, caches, and performance-sensitive logic.",
  },
  "stacks-queues": {
    what: "Structures for last-in-first-out and first-in-first-out processing.",
    why: "They model real workflows like undo history, background tasks, breadth-first search, and event processing.",
    where: "Used in schedulers, parsers, graph traversal, message systems, and async workers.",
  },
  "trees-graphs": {
    what: "Non-linear structures for hierarchy and relationships.",
    why: "Many real systems are relationship systems: routes, dependencies, org charts, permissions, and recommendations.",
    where: "Used in search, routing, dependency graphs, knowledge graphs, compilers, and social networks.",
  },
  sorting: {
    what: "Arranging data by a rule such as time, priority, score, or name.",
    why: "Sorting makes data usable and is a foundation for ranking, reporting, and efficient searching.",
    where: "Used in dashboards, leaderboards, logs, analytics, pagination, and recommendation outputs.",
  },
  searching: {
    what: "Finding specific values, records, or paths in a data structure.",
    why: "Search speed often determines whether a feature feels instant or slow.",
    where: "Used in APIs, databases, logs, autocomplete, routing, and retrieval systems.",
  },
  "sql-joins": {
    what: "Combining rows from multiple tables based on relationships.",
    why: "Business data is normalized across tables. Joins turn it into useful answers.",
    where: "Used in reporting, analytics, API queries, customer views, financial systems, and warehouses.",
  },
  "views-indexes": {
    what: "Views save reusable query logic; indexes speed up lookups.",
    why: "They improve maintainability and performance when queries become frequent or complex.",
    where: "Used in PostgreSQL, MySQL, analytics databases, dashboards, and backend APIs.",
  },
  "window-functions": {
    what: "SQL functions that compute values across related rows without collapsing the result.",
    why: "They solve ranking, running totals, deduplication, and trend analysis elegantly.",
    where: "Used in analytics, finance, reporting, cohort analysis, and warehouse transformations.",
  },
  ctes: {
    what: "Common table expressions: named temporary result sets inside a SQL query.",
    why: "They break complex SQL into readable steps and make transformations easier to debug.",
    where: "Used in analytics SQL, dbt models, warehouse transformations, and reporting queries.",
  },
  postgresql: {
    what: "A production-grade relational database with strong SQL, indexing, transactions, and extensions.",
    why: "It is reliable, widely adopted, and powerful enough for serious backend and analytics workloads.",
    where: "Used in SaaS apps, internal tools, APIs, reporting systems, and data platforms.",
  },
  psycopg2: {
    what: "A Python adapter for connecting to PostgreSQL.",
    why: "It lets Python scripts and services read/write relational data directly.",
    where: "Used in ETL jobs, backend services, admin scripts, and data migration tools.",
  },
  fastapi: {
    what: "A modern Python framework for building APIs with type hints and automatic OpenAPI docs.",
    why: "It is fast to build with, easy to document, and strong for AI/data backend services.",
    where: "Used in microservices, ML model serving, internal platforms, admin APIs, and SaaS backends.",
  },
  "rest-apis": {
    what: "HTTP-based interfaces where clients interact with resources through endpoints.",
    why: "APIs are how frontend apps, mobile apps, workers, and partner systems communicate.",
    where: "Used in web apps, integrations, data services, AI platforms, and enterprise systems.",
  },
  "request-handling": {
    what: "Parsing incoming API requests, including path params, query params, headers, body data, and files.",
    why: "Correct request handling is the first boundary between users and your backend logic.",
    where: "Used in FastAPI routes, webhooks, form submissions, file uploads, and service integrations.",
  },
  "response-models": {
    what: "Structured output schemas that define what an API sends back to clients.",
    why: "They keep API responses predictable, documented, and easier for frontend or integration teams to consume.",
    where: "Used in FastAPI, Pydantic, OpenAPI docs, SDK generation, and contract testing.",
  },
  validation: {
    what: "Checking that incoming data has the correct shape, type, and business meaning.",
    why: "Validation protects systems from bad input and makes errors clear to users and developers.",
    where: "Used in APIs, ETL pipelines, forms, configs, data contracts, and model inputs.",
  },
  authentication: {
    what: "Verifying who a user or system is.",
    why: "Without authentication, private data and privileged actions are exposed.",
    where: "Used in dashboards, APIs, admin tools, enterprise apps, and service-to-service calls.",
  },
  pytest: {
    what: "A Python testing framework for unit, integration, and functional tests.",
    why: "Tests let teams refactor and ship without guessing whether core behavior still works.",
    where: "Used in backend services, data pipelines, libraries, CI/CD, and production regression suites.",
  },
  "unit-testing": {
    what: "Testing one small function, class, or behavior in isolation.",
    why: "Unit tests catch logic errors quickly and make refactoring less risky.",
    where: "Used in business rules, utility functions, validators, transforms, and service-layer behavior.",
  },
  "integration-testing": {
    what: "Testing how multiple parts work together, such as API plus database or service plus queue.",
    why: "Many production bugs happen at boundaries, not inside isolated functions.",
    where: "Used in FastAPI endpoints, database workflows, ETL jobs, third-party integrations, and CI pipelines.",
  },
  mocking: {
    what: "Replacing real dependencies with controlled fake behavior during tests.",
    why: "Mocking makes tests faster, deterministic, and independent from real APIs, emails, queues, or cloud services.",
    where: "Used around HTTP calls, payment providers, cloud SDKs, databases, and time-based logic.",
  },
  requests: {
    what: "A Python library for making HTTP requests.",
    why: "Many integrations start by calling an external API and processing the response.",
    where: "Used in API clients, automation scripts, scrapers, data ingestion, and integration tests.",
  },
  beautifulsoup: {
    what: "A Python library for parsing HTML and extracting information from web pages.",
    why: "It makes messy web pages easier to navigate and transform into structured data.",
    where: "Used in scraping, research tools, price trackers, content extraction, and dataset creation.",
  },
  scrapy: {
    what: "A framework for building larger, structured web scraping systems.",
    why: "It handles crawling, retries, pipelines, and scale better than one-off scripts.",
    where: "Used in market intelligence, search indexing, data collection, and competitor analysis.",
  },
  "data-collection": {
    what: "Gathering raw data from APIs, websites, files, databases, forms, or streams.",
    why: "Analytics, automation, and AI systems are only as useful as the data they can reliably collect.",
    where: "Used in scraping pipelines, ETL jobs, research tools, integrations, and telemetry systems.",
  },
  pandas: {
    what: "A Python library for tabular data analysis using DataFrames.",
    why: "It makes cleaning, grouping, joining, and transforming datasets productive.",
    where: "Used in analytics, ETL prototypes, reporting, notebooks, and data validation.",
  },
  numpy: {
    what: "A fast numerical computing library built around arrays.",
    why: "It powers much of the Python data ecosystem and makes numerical operations efficient.",
    where: "Used in data science, ML, scientific computing, vector math, and pandas internals.",
  },
  "data-cleaning": {
    what: "Fixing missing values, invalid types, duplicates, inconsistent labels, and noisy records.",
    why: "Clean data prevents broken reports, bad model behavior, and misleading business decisions.",
    where: "Used in pandas, Spark, dbt, warehouses, feature engineering, and data quality checks.",
  },
  aggregation: {
    what: "Combining many records into summaries such as counts, totals, averages, and grouped metrics.",
    why: "Most business questions need summarized data, not raw event rows.",
    where: "Used in dashboards, reports, SQL GROUP BY, pandas groupby, Spark aggregations, and KPIs.",
  },
  transformations: {
    what: "Changing data shape, structure, format, or meaning to make it useful.",
    why: "Transformations bridge the gap between raw source data and business-ready datasets.",
    where: "Used in ETL, pandas, Spark, dbt, API normalization, and warehouse modeling.",
  },
  matplotlib: {
    what: "A foundational Python plotting library.",
    why: "It gives precise control for static charts and is widely supported across notebooks and reports.",
    where: "Used in analysis notebooks, reports, monitoring snapshots, and exploratory data work.",
  },
  plotly: {
    what: "A charting library for interactive visualizations.",
    why: "It helps users explore data through hover states, zooming, filters, and dashboards.",
    where: "Used in analytics dashboards, business reporting, data apps, and executive views.",
  },
  "dashboard-design": {
    what: "The practice of turning metrics into clear visual decision interfaces.",
    why: "A dashboard is useful only when it answers the right question quickly.",
    where: "Used in operations, finance, product analytics, sales, observability, and executive reporting.",
  },
  "business-reporting": {
    what: "Communicating operational or strategic metrics in a format stakeholders can act on.",
    why: "Good reporting turns raw data into decisions and accountability.",
    where: "Used in finance, sales, product, operations, HR, and leadership dashboards.",
  },
  extract: {
    what: "The first ETL step: collecting data from files, APIs, databases, streams, or applications.",
    why: "Bad extraction creates missing, duplicated, or unreliable data downstream.",
    where: "Used in ETL jobs, warehouse loading, data lakes, scraping systems, and integration pipelines.",
  },
  transform: {
    what: "Cleaning, reshaping, joining, validating, and enriching raw data.",
    why: "Raw data rarely matches business needs. Transformations make it trustworthy and usable.",
    where: "Used in pandas jobs, Spark pipelines, dbt models, warehouses, and reporting layers.",
  },
  load: {
    what: "Writing processed data into a target like PostgreSQL, S3, Snowflake, or Redshift.",
    why: "Loading makes data available for apps, dashboards, models, or other teams.",
    where: "Used in ETL/ELT pipelines, lakehouse systems, warehouses, and backend data syncs.",
  },
  "csv-processing": {
    what: "Reading, validating, transforming, and writing comma-separated tabular files.",
    why: "CSV remains one of the most common ways businesses exchange data.",
    where: "Used in imports, exports, vendor feeds, reports, batch jobs, and early-stage ETL pipelines.",
  },
  "pipeline-design": {
    what: "Designing the steps, dependencies, retries, validation, and outputs of a data workflow.",
    why: "A pipeline is production software; design determines reliability, observability, and recovery.",
    where: "Used in ETL jobs, Airflow DAGs, ML feature pipelines, data syncs, and platform workflows.",
  },
  dags: {
    what: "Directed acyclic graphs: dependency graphs that describe workflow order.",
    why: "They make pipelines observable, schedulable, and easier to recover when steps fail.",
    where: "Used in Airflow, Dagster, Prefect, ML pipelines, and data platforms.",
  },
  operators: {
    what: "Reusable task building blocks inside workflow orchestrators.",
    why: "They standardize common work such as running Python, SQL, Spark, shell, or cloud tasks.",
    where: "Used in Airflow DAGs, managed workflows, ETL jobs, and platform automation.",
  },
  scheduling: {
    what: "Running jobs at specific times, intervals, or in response to dependencies.",
    why: "Reliable schedules turn manual work into repeatable production workflows.",
    where: "Used in reports, ETL, backups, notifications, ML retraining, and monitoring jobs.",
  },
  monitoring: {
    what: "Tracking health, failures, latency, throughput, cost, and data quality.",
    why: "A production system is not real until you can see when it breaks and why.",
    where: "Used in APIs, pipelines, streaming jobs, databases, infrastructure, and AI systems.",
  },
  pyspark: {
    what: "Python API for Apache Spark, used for distributed data processing.",
    why: "It lets Python process datasets that are too large for a single machine.",
    where: "Used in big data ETL, lakehouse pipelines, analytics platforms, and ML feature generation.",
  },
  dataframes: {
    what: "Table-like data structures with named columns and row operations.",
    why: "DataFrames give engineers a practical interface for filtering, joining, aggregating, and transforming data.",
    where: "Used in pandas, PySpark, Polars, notebooks, ETL jobs, and analytics pipelines.",
  },
  "spark-sql": {
    what: "SQL interface for querying distributed Spark data.",
    why: "It combines SQL productivity with Spark's distributed processing power.",
    where: "Used in lakehouses, batch ETL, warehouse staging, and large analytical transformations.",
  },
  partitioning: {
    what: "Splitting data by keys such as date, region, or customer to improve access and processing.",
    why: "Good partitioning can reduce cost and speed up queries dramatically.",
    where: "Used in Spark, S3 data lakes, Delta Lake, Iceberg, BigQuery, and warehouses.",
  },
  optimization: {
    what: "Improving performance, memory, cost, or reliability after measuring bottlenecks.",
    why: "Optimization keeps systems usable and affordable as data and traffic grow.",
    where: "Used in APIs, SQL queries, Spark jobs, databases, caching, and infrastructure.",
  },
  "kafka-producers": {
    what: "Applications that publish events into Kafka topics.",
    why: "They decouple data creation from downstream consumers and enable real-time systems.",
    where: "Used in order tracking, payments, telemetry, clickstreams, IoT, and event-driven platforms.",
  },
  "kafka-consumers": {
    what: "Applications that read events from Kafka topics.",
    why: "They let multiple systems react independently to the same stream of events.",
    where: "Used in notifications, fraud checks, analytics, search indexing, and streaming ETL.",
  },
  "topics-partitions": {
    what: "Kafka topics organize events; partitions split topics for scale and parallelism.",
    why: "They determine throughput, ordering, replay behavior, and consumer scaling.",
    where: "Used in every Kafka-based streaming architecture.",
  },
  "spark-streaming": {
    what: "Spark's API for processing continuous or micro-batch streams.",
    why: "It connects big-data transformations with near-real-time data flows.",
    where: "Used in fraud detection, live dashboards, operational analytics, and event pipelines.",
  },
  "aws-s3": {
    what: "AWS object storage commonly used for raw files, data lakes, and assets.",
    why: "It is durable, cheap, scalable, and integrates with most AWS data services.",
    where: "Used in data lakes, file ingestion, backups, ML datasets, and static assets.",
  },
  "aws-lambda": {
    what: "Serverless compute that runs code in response to events.",
    why: "It is useful for lightweight automation without managing servers.",
    where: "Used in file triggers, API glue, scheduled jobs, notifications, and data ingestion.",
  },
  "aws-glue": {
    what: "AWS managed data integration and ETL service.",
    why: "It helps catalog, transform, and move data across AWS data platforms.",
    where: "Used in S3 data lakes, ETL jobs, crawlers, catalogs, and warehouse loading.",
  },
  athena: {
    what: "AWS serverless SQL query engine for data stored in S3.",
    why: "It lets teams query lake data without running database servers.",
    where: "Used in ad hoc analytics, data lake exploration, audit queries, and cost-effective reporting.",
  },
  redshift: {
    what: "AWS cloud data warehouse for large-scale analytical queries.",
    why: "It is built for reporting, BI, and high-volume warehouse workloads.",
    where: "Used in enterprise analytics, dashboards, finance reporting, and customer intelligence.",
  },
  dbt: {
    what: "A transformation framework for building tested, documented SQL models.",
    why: "It brings software engineering discipline to analytics and warehouse transformations.",
    where: "Used in analytics engineering, warehouse modeling, metrics layers, and data quality workflows.",
  },
  "delta-lake": {
    what: "A lakehouse storage layer that adds ACID transactions and versioning to data lakes.",
    why: "It makes data lakes more reliable for production analytics and ML workflows.",
    where: "Used in Spark lakehouses, medallion architectures, batch pipelines, and ML features.",
  },
  docker: {
    what: "A container platform that packages apps with their dependencies.",
    why: "It makes local, staging, and production environments more consistent.",
    where: "Used in APIs, ETL jobs, CI/CD, ML serving, local dev environments, and deployments.",
  },
  kubernetes: {
    what: "A container orchestration platform for running services at scale.",
    why: "It handles deployment, scaling, service discovery, and recovery for containerized systems.",
    where: "Used in production platforms, microservices, data jobs, model serving, and enterprise infrastructure.",
  },
  cicd: {
    what: "Continuous integration and continuous delivery pipelines that test and ship code automatically.",
    why: "CI/CD reduces manual release risk and catches problems before production.",
    where: "Used in GitHub Actions, GitLab CI, Jenkins, API deployments, data jobs, and platform releases.",
  },
  "ci-cd": {
    what: "Continuous integration and continuous delivery pipelines that test and ship code automatically.",
    why: "CI/CD reduces manual release risk and catches problems before production.",
    where: "Used in GitHub Actions, GitLab CI, Jenkins, API deployments, data jobs, and platform releases.",
  },
  "data-quality": {
    what: "Checks that data is complete, valid, fresh, unique, and aligned with expectations.",
    why: "Bad data creates bad decisions, bad models, and broken user experiences.",
    where: "Used in ETL, warehouses, data contracts, dashboards, ML features, and compliance systems.",
  },
  "enterprise-architecture": {
    what: "Designing systems that fit business scale, reliability, governance, and team ownership.",
    why: "Enterprise systems fail when tools are chosen without architecture, ownership, and operating model.",
    where: "Used in platforms, cloud migrations, AI systems, data warehouses, and internal engineering products.",
  },
};

export const ROADMAP_TOPIC_SUPPLEMENTS: RoadmapTopicSupplement[] = [
  {
    topicId: "python-fundamentals",
    tools: ["Python 3.12+", "venv", "pip", "VS Code", "ruff", "JSON/CSV"],
    outcomes: ["Write clean scripts", "Handle files safely", "Break logic into functions", "Debug beginner runtime errors"],
  },
  {
    topicId: "oop-python",
    tools: ["dataclasses", "abc", "typing.Protocol", "UML-lite sketches", "pytest"],
    outcomes: ["Model real domains", "Separate state from behavior", "Use composition cleanly", "Avoid over-engineered inheritance"],
  },
  {
    topicId: "advanced-python",
    tools: ["itertools", "functools", "contextlib", "logging", "regex", "ruff"],
    outcomes: ["Read production code confidently", "Write memory-aware processors", "Add reusable wrappers", "Build cleaner utility libraries"],
  },
  {
    topicId: "dsa-python",
    tools: ["collections", "heapq", "bisect", "deque", "networkx"],
    outcomes: ["Choose the right structure", "Solve graph/path problems", "Reason about complexity", "Prepare for engineering interviews"],
  },
  {
    topicId: "sql-postgresql",
    tools: ["PostgreSQL", "psycopg2", "SQLAlchemy Core", "DBeaver", "pgAdmin"],
    outcomes: ["Design normalized tables", "Write analytical SQL", "Optimize slow queries", "Connect Python to relational data"],
  },
  {
    topicId: "fastapi-development",
    tools: ["FastAPI", "Pydantic", "SQLAlchemy", "Alembic", "Uvicorn", "JWT"],
    outcomes: ["Build production APIs", "Validate request/response data", "Document endpoints", "Add auth and database access"],
  },
  {
    topicId: "testing-python",
    tools: ["pytest", "pytest-cov", "factory-boy", "responses", "moto", "GitHub Actions"],
    outcomes: ["Write unit tests", "Mock external systems", "Test APIs", "Run checks in CI"],
  },
  {
    topicId: "web-scraping",
    tools: ["requests", "BeautifulSoup", "Scrapy", "Playwright", "robots.txt"],
    outcomes: ["Collect web data responsibly", "Parse messy HTML", "Handle pagination", "Persist scraped datasets"],
  },
  {
    topicId: "pandas-numpy",
    tools: ["pandas", "NumPy", "Jupyter", "pyarrow", "Polars"],
    outcomes: ["Clean datasets", "Aggregate business metrics", "Transform files for ETL", "Detect missing or invalid records"],
  },
  {
    topicId: "visualization",
    tools: ["Matplotlib", "Plotly", "Streamlit", "Dash", "Power BI basics"],
    outcomes: ["Tell data stories", "Build interactive dashboards", "Choose useful charts", "Explain insights to non-engineers"],
  },
  {
    topicId: "etl-pipelines",
    tools: ["pandas", "PostgreSQL", "SQLAlchemy", "Parquet", "Great Expectations"],
    outcomes: ["Build repeatable pipelines", "Validate transformed data", "Load databases safely", "Design incremental jobs"],
  },
  {
    topicId: "airflow-orchestration",
    tools: ["Apache Airflow", "DAGs", "Operators", "Sensors", "Docker Compose"],
    outcomes: ["Schedule pipelines", "Handle retries", "Monitor failures", "Design dependency graphs"],
  },
  {
    topicId: "spark-big-data",
    tools: ["PySpark", "Spark SQL", "Parquet", "Delta Lake", "Databricks"],
    outcomes: ["Process large datasets", "Tune partitions", "Use distributed joins", "Move from pandas to Spark"],
  },
  {
    topicId: "kafka-streaming",
    tools: ["Apache Kafka", "Kafka UI", "Spark Streaming", "Schema Registry", "Docker Compose"],
    outcomes: ["Design event streams", "Build producers/consumers", "Understand partitions", "Process near-real-time data"],
  },
  {
    topicId: "cloud-data-engineering",
    tools: ["AWS S3", "Lambda", "Glue", "Athena", "Redshift", "IAM"],
    outcomes: ["Build cloud-native pipelines", "Use S3 as a data lake", "Query lake data", "Understand cloud permissions"],
  },
  {
    topicId: "advanced-de-capstone",
    tools: ["dbt", "Delta Lake", "Docker", "Kubernetes", "GitHub Actions", "Prometheus/Grafana"],
    outcomes: ["Ship a portfolio-grade platform", "Connect batch and streaming systems", "Add CI/CD", "Explain architecture trade-offs"],
  },
];

export const ROADMAP_DETAILS: RoadmapDetail[] = [
  {
    roadmapId: "data-engineering",
    intro:
      "Don't learn tools randomly. Learn them in the same order that data flows through a real company — from sources to ingestion, storage, processing, warehousing, analytics, governance, and cloud.",
    startTopicId: "linux-foundations",
    stages: [
      {
        id: "foundations",
        index: "01",
        title: "Foundation",
        description: "Build the strong foundations needed before touching any data engineering tools.",
        topics: [
          {
            id: "linux-foundations",
            title: "Linux",
            summary: "File systems, permissions, shell scripting, cron jobs, SSH, and process management.",
            description:
              "Every production server runs Linux. Learn file systems, permissions, shell scripting, cron jobs, SSH, and process management before moving to data tools.",
            level: "Start here",
            duration: "1 week",
            skills: ["File systems", "Permissions", "Shell scripting", "Cron jobs", "SSH", "Process management"],
            projects: [
              {
                title: "Log Monitoring System",
                description: "Create shell scripts that read server logs, extract errors, and generate reports.",
              },
            ],
            resources: [
              {
                label: "Linux command line tutorial",
                type: "Documentation",
                url: "https://linuxcommand.org/",
              },
              {
                label: "Bash scripting guide",
                type: "Documentation",
                url: "https://www.gnu.org/software/bash/manual/",
              },
            ],
          },
          {
            id: "git-foundations",
            title: "Git & GitHub",
            summary: "Branching, merging, pull requests, and Git workflows.",
            description:
              "Every company uses Git. Learn branching, merging, pull requests, and standard Git workflows to maintain code versions collaboratively.",
            level: "Foundation",
            duration: "3-5 days",
            skills: ["Branching", "Merging", "Pull Requests", "Git workflows"],
            projects: [
              {
                title: "Team Data Pipeline Repository",
                description: "Maintain code versions with branching strategy and pull request reviews.",
              },
            ],
            resources: [
              {
                label: "GitHub Skills",
                type: "Practice",
                url: "https://skills.github.com/",
              },
              {
                label: "Git documentation",
                type: "Documentation",
                url: "https://git-scm.com/doc",
              },
            ],
          },
          {
            id: "python-foundations",
            title: "Python",
            summary: "Variables, functions, OOP, exception handling, APIs, file handling, pandas, numpy.",
            description:
              "Python is the primary language for data engineering. Learn variables, functions, OOP, exception handling, APIs, file handling, and key libraries like pandas and numpy.",
            level: "Foundation",
            duration: "2-3 weeks",
            skills: ["Variables & Functions", "OOP", "Exception Handling", "APIs", "File Handling", "pandas", "numpy"],
            projects: [
              {
                title: "Sales Data Analyzer",
                description: "Read CSV files and generate business reports using pandas and numpy.",
              },
            ],
            resources: [
              {
                label: "Official Python tutorial",
                type: "Documentation",
                url: "https://docs.python.org/3/tutorial/",
              },
              {
                label: "pandas getting started",
                type: "Documentation",
                url: "https://pandas.pydata.org/docs/getting_started/",
              },
            ],
          },
        ],
      },
      {
        id: "databases-modeling",
        index: "02",
        title: "Databases & Data Modeling",
        description: "Understand where data lives and how to structure it for analytics.",
        topics: [
          {
            id: "sql-deep",
            title: "SQL",
            summary: "SELECT, JOIN, GROUP BY, window functions, CTEs, indexes, and query optimization.",
            description:
              "90% of data engineering jobs ask SQL. Master SELECT, JOIN, GROUP BY, window functions, CTEs, indexes, and query optimization using PostgreSQL or MySQL.",
            level: "Foundation",
            duration: "3-4 weeks",
            skills: ["SELECT & JOIN", "GROUP BY", "Window Functions", "CTEs", "Indexes", "Query Optimization"],
            projects: [
              {
                title: "E-Commerce Database",
                description: "Build tables for customers, orders, products, payments. Run revenue reports, customer analytics, and product insights.",
              },
            ],
            resources: [
              {
                label: "PostgreSQL tutorial",
                type: "Documentation",
                url: "https://www.postgresqltutorial.com/",
              },
              {
                label: "SQL practice",
                type: "Practice",
                url: "https://pgexercises.com/",
              },
            ],
          },
          {
            id: "data-modeling",
            title: "Data Modeling",
            summary: "OLTP vs OLAP, star schema, snowflake schema, fact tables, and dimension tables.",
            description:
              "Learn how companies structure analytics systems. Understand OLTP vs OLAP, star schema, snowflake schema, fact tables, and dimension tables.",
            level: "Intermediate",
            duration: "1-2 weeks",
            skills: ["OLTP vs OLAP", "Star Schema", "Snowflake Schema", "Fact Tables", "Dimension Tables"],
            projects: [
              {
                title: "Retail Data Warehouse Design",
                description: "Build fact sales, customer dimension, and product dimension tables.",
              },
            ],
            resources: [
              {
                label: "Data modeling concepts",
                type: "Documentation",
                url: "https://www.kimballgroup.com/data-warehouse-bus-archive/",
              },
              {
                label: "Star schema tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=star+schema+data+warehousing",
              },
            ],
          },
        ],
      },
      {
        id: "warehousing-processing",
        index: "03",
        title: "Data Warehousing & Processing",
        description: "Learn to store, transform, and process data at scale.",
        topics: [
          {
            id: "data-warehousing",
            title: "Data Warehousing",
            summary: "ETL, ELT, data marts, slowly changing dimensions, Snowflake, BigQuery, Redshift.",
            description:
              "Executives use warehouse data for decisions. Learn ETL, ELT, data marts, slowly changing dimensions, and start with PostgreSQL then Snowflake or BigQuery.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["ETL/ELT", "Data Marts", "Slowly Changing Dimensions", "Snowflake", "BigQuery"],
            projects: [
              {
                title: "Company Analytics Warehouse",
                description: "Build a warehouse from sales CSV, customer CSV, and marketing CSV files.",
              },
            ],
            resources: [
              {
                label: "Snowflake documentation",
                type: "Documentation",
                url: "https://docs.snowflake.com/",
              },
              {
                label: "BigQuery documentation",
                type: "Documentation",
                url: "https://cloud.google.com/bigquery/docs",
              },
            ],
          },
          {
            id: "pandas-processing",
            title: "Pandas",
            summary: "Cleaning, aggregations, transformations for small-to-medium datasets.",
            description:
              "Learn data cleaning, aggregations, and transformations with pandas for small-to-medium datasets before moving to distributed processing.",
            level: "Intermediate",
            duration: "1 week",
            skills: ["Cleaning", "Aggregations", "Transformations"],
            projects: [
              {
                title: "Customer Churn Analysis",
                description: "Analyze customer data to identify churn patterns and generate insights.",
              },
            ],
            resources: [
              {
                label: "pandas documentation",
                type: "Documentation",
                url: "https://pandas.pydata.org/docs/",
              },
              {
                label: "pandas data analysis videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=pandas+data+analysis+project",
              },
            ],
          },
          {
            id: "pyspark",
            title: "PySpark",
            summary: "RDD, DataFrame API, Spark SQL, partitioning, and optimization.",
            description:
              "Used in big data systems. Learn RDD, DataFrame API, Spark SQL, partitioning, and optimization to process massive datasets.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["RDD", "DataFrame API", "Spark SQL", "Partitioning", "Optimization"],
            projects: [
              {
                title: "Process 10 Million Records",
                description: "Build a pipeline: raw data → clean → aggregate → store using PySpark.",
              },
            ],
            resources: [
              {
                label: "Apache Spark documentation",
                type: "Documentation",
                url: "https://spark.apache.org/docs/latest/",
              },
              {
                label: "PySpark tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=pyspark+tutorial+beginner",
              },
            ],
          },
        ],
      },
      {
        id: "big-data-ingestion",
        index: "04",
        title: "Big Data & Ingestion",
        description: "Understand the big data ecosystem and how data enters the system.",
        topics: [
          {
            id: "hadoop-ecosystem",
            title: "Hadoop Ecosystem",
            summary: "HDFS, YARN, Hive, distributed computing, and distributed storage.",
            description:
              "Understand why Spark exists. Learn HDFS, YARN, Hive, and the concepts of distributed computing and storage. Many legacy enterprises still use Hadoop.",
            level: "Intermediate",
            duration: "2 weeks",
            skills: ["HDFS", "YARN", "Hive", "Distributed Computing", "Distributed Storage"],
            projects: [
              {
                title: "Mini Hadoop Cluster",
                description: "Store and query large datasets using HDFS and Hive.",
              },
            ],
            resources: [
              {
                label: "Apache Hadoop documentation",
                type: "Documentation",
                url: "https://hadoop.apache.org/docs/stable/",
              },
              {
                label: "Hadoop ecosystem overview",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=hadoop+ecosystem+overview",
              },
            ],
          },
          {
            id: "batch-ingestion",
            title: "Batch Ingestion",
            summary: "Python scripts, scheduled jobs, and CSV-to-warehouse pipelines.",
            description:
              "Most business reports run on batch data. Learn to build daily pipelines that move CSV data into a warehouse using Python and scheduling.",
            level: "Intermediate",
            duration: "1 week",
            skills: ["Python scripts", "Scheduling", "CSV processing"],
            projects: [
              {
                title: "Daily Sales Pipeline",
                description: "Build a batch pipeline: CSV → warehouse with scheduled daily runs.",
              },
            ],
            resources: [
              {
                label: "Python file I/O",
                type: "Documentation",
                url: "https://docs.python.org/3/library/io.html",
              },
            ],
          },
          {
            id: "streaming-kafka",
            title: "Streaming with Kafka",
            summary: "Producers, consumers, topics, partitions, offsets, and real-time pipelines.",
            description:
              "Learn how Amazon, Uber, and Netflix handle real-time data. Master producers, consumers, topics, partitions, and offsets with Apache Kafka.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Producers", "Consumers", "Topics", "Partitions", "Offsets"],
            projects: [
              {
                title: "Real-Time Order Tracking",
                description: "Build a streaming pipeline: orders → Kafka → Spark → dashboard.",
              },
            ],
            resources: [
              {
                label: "Apache Kafka documentation",
                type: "Documentation",
                url: "https://kafka.apache.org/documentation/",
              },
              {
                label: "Kafka tutorial videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=apache+kafka+tutorial",
              },
            ],
          },
        ],
      },
      {
        id: "orchestration-cloud",
        index: "05",
        title: "Orchestration & Cloud",
        description: "Schedule pipelines and deploy on cloud infrastructure.",
        topics: [
          {
            id: "airflow",
            title: "Apache Airflow",
            summary: "DAGs, operators, scheduling, monitoring, and end-to-end ETL pipelines.",
            description:
              "Industry standard scheduler. Learn DAGs, operators, scheduling, and monitoring to orchestrate complex data pipelines.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["DAGs", "Operators", "Scheduling", "Monitoring"],
            projects: [
              {
                title: "End-to-End ETL Pipeline",
                description: "Airflow pipeline: extract data → transform → load warehouse → generate report.",
              },
            ],
            resources: [
              {
                label: "Apache Airflow documentation",
                type: "Documentation",
                url: "https://airflow.apache.org/docs/",
              },
              {
                label: "Airflow tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=apache+airflow+tutorial",
              },
            ],
          },
          {
            id: "aws-cloud",
            title: "AWS Cloud",
            summary: "S3, EC2, IAM, Lambda, Glue, Athena, Redshift, EMR, and data lakes.",
            description:
              "Huge demand for AWS data engineers. Learn S3, EC2, IAM, Lambda, Glue, Athena, Redshift, and EMR to build cloud data infrastructure.",
            level: "Advanced",
            duration: "4-6 weeks",
            skills: ["S3", "EC2", "IAM", "Lambda", "Glue", "Athena", "Redshift", "EMR"],
            projects: [
              {
                title: "AWS Data Lake",
                description: "Build a data lake pipeline: S3 → Glue → Athena → Redshift.",
              },
            ],
            resources: [
              {
                label: "AWS documentation",
                type: "Documentation",
                url: "https://docs.aws.amazon.com/",
              },
              {
                label: "AWS data engineering videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=aws+data+engineering+project",
              },
            ],
          },
        ],
      },
      {
        id: "modern-stack-production",
        index: "06",
        title: "Modern Stack & Production",
        description: "Modern data tools, containers, deployment, and production reliability.",
        topics: [
          {
            id: "modern-data-stack",
            title: "Modern Data Stack",
            summary: "dbt, Great Expectations, data quality, and analytics engineering.",
            description:
              "Used heavily in modern startups. Learn dbt for models, tests, and documentation. Use Great Expectations for data validation — nulls, duplicates, and schema drift.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["dbt", "Great Expectations", "Data Quality", "Analytics Engineering"],
            projects: [
              {
                title: "Analytics Engineering Pipeline",
                description: "Build a dbt pipeline with data validation framework using Great Expectations.",
              },
            ],
            resources: [
              {
                label: "dbt documentation",
                type: "Documentation",
                url: "https://docs.getdbt.com/",
              },
              {
                label: "Great Expectations docs",
                type: "Documentation",
                url: "https://docs.greatexpectations.io/",
              },
            ],
          },
          {
            id: "data-lakes-lakehouse",
            title: "Data Lakes & Lakehouse",
            summary: "S3/ADLS/GCS, Parquet, Delta Lake, Iceberg, and lakehouse architecture.",
            description:
              "Foundation of modern architectures. Learn storage formats (CSV, JSON, Parquet, ORC), data lake zones (raw → processed → curated), and lakehouse tools like Delta Lake and Iceberg.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Data Lakes", "Parquet", "Delta Lake", "Apache Iceberg", "Lakehouse Architecture"],
            projects: [
              {
                title: "Modern Lakehouse",
                description: "Build a lakehouse pipeline: Kafka → Spark → Delta Lake with raw/processed/curated zones.",
              },
            ],
            resources: [
              {
                label: "Delta Lake documentation",
                type: "Documentation",
                url: "https://docs.delta.io/latest/",
              },
              {
                label: "Apache Iceberg docs",
                type: "Documentation",
                url: "https://iceberg.apache.org/docs/latest/",
              },
            ],
          },
          {
            id: "docker-k8s-cicd",
            title: "Docker, Kubernetes & CI/CD",
            summary: "Containers, pods, deployments, GitHub Actions, and automated pipeline deployment.",
            description:
              "Production-grade engineering requires containers and automation. Learn Docker (images, containers, volumes), Kubernetes (pods, deployments, services), and CI/CD with GitHub Actions or Jenkins.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Docker", "Kubernetes", "GitHub Actions", "CI/CD"],
            projects: [
              {
                title: "Automated Data Pipeline Deployment",
                description: "Containerize an ETL pipeline, deploy on Kubernetes, and automate with CI/CD.",
              },
            ],
            resources: [
              {
                label: "Docker documentation",
                type: "Documentation",
                url: "https://docs.docker.com/",
              },
              {
                label: "Kubernetes tutorial",
                type: "Documentation",
                url: "https://kubernetes.io/docs/tutorials/",
              },
            ],
          },
          {
            id: "monitoring-governance",
            title: "Monitoring & Governance",
            summary: "Prometheus, Grafana, data lineage, data catalog, and enterprise governance.",
            description:
              "Production reliability requires monitoring. Learn Prometheus and Grafana for pipeline monitoring. For enterprise: data governance with Apache Atlas, data catalog with DataHub, and data lineage tracking.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Prometheus", "Grafana", "Data Governance", "Data Lineage", "Data Catalog"],
            projects: [
              {
                title: "Enterprise Governance Platform",
                description: "Build a monitoring dashboard with Prometheus/Grafana and implement data lineage tracking.",
              },
            ],
            resources: [
              {
                label: "Prometheus documentation",
                type: "Documentation",
                url: "https://prometheus.io/docs/",
              },
              {
                label: "Grafana documentation",
                type: "Documentation",
                url: "https://grafana.com/docs/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "python-developer",
    intro:
      "Python is the backbone of most data engineering work. This path takes you from Python developer → backend developer → ETL developer → junior data engineer → mid-level data engineer → senior data engineer, with every project building on the previous one.",
    startTopicId: "python-fundamentals",
    stages: [
      {
        id: "python-fundamentals",
        index: "01",
        title: "Python Fundamentals",
        description: "Learn how to write programs and think like a developer.",
        topics: [
          {
            id: "python-fundamentals",
            title: "Python Fundamentals",
            summary: "Variables, data types, operators, loops, conditions, functions, modules, exception handling, and I/O.",
            description:
              "Learn how to write programs and think like a developer. Master variables, data types, operators, loops, conditions, functions, modules, exception handling, and input/output operations — the foundation of every software application.",
            level: "Start here",
            duration: "1 month",
            skills: ["Variables & Data Types", "Loops & Conditions", "Functions", "Modules & Imports", "Exception Handling", "File I/O"],
            projects: [
              {
                title: "Student Management System",
                description: "Build a console app that adds, updates, deletes, and searches students with file-based persistence. Teaches CRUD operations — the foundation of almost every software application.",
              },
            ],
            resources: [
              {
                label: "Official Python tutorial",
                type: "Documentation",
                url: "https://docs.python.org/3/tutorial/",
              },
              {
                label: "Python beginner videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=python+beginner+tutorial",
              },
              {
                label: "Python exercises",
                type: "Practice",
                url: "https://exercism.org/tracks/python",
              },
            ],
          },
          {
            id: "oop-python",
            title: "Object-Oriented Programming",
            summary: "Classes, objects, inheritance, polymorphism, encapsulation, and abstraction.",
            description:
              "Learn how large software systems are structured through OOP. Master classes, objects, inheritance, polymorphism, encapsulation, and abstraction — most enterprise software is written using these principles.",
            level: "Foundation",
            duration: "1 month",
            skills: ["Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
            projects: [
              {
                title: "Banking Management System",
                description: "Build a mini banking app with account creation, deposits, withdrawals, and transaction history using OOP principles.",
              },
            ],
            resources: [
              {
                label: "Python classes",
                type: "Documentation",
                url: "https://docs.python.org/3/tutorial/classes.html",
              },
              {
                label: "OOP practice videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=python+oop+composition",
              },
            ],
          },
        ],
      },
      {
        id: "advanced-python-dsa",
        index: "02",
        title: "Advanced Python & DSA",
        description: "Write production-quality code and solve problems efficiently.",
        topics: [
          {
            id: "advanced-python",
            title: "Advanced Python",
            summary: "Decorators, generators, iterators, context managers, lambda, map, filter, and reduce.",
            description:
              "Become comfortable writing production code. Learn decorators, generators, iterators, context managers, lambda, map, filter, and reduce — patterns you'll see in every Python codebase.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Decorators", "Generators", "Iterators", "Context Managers", "Lambda & Functional Tools"],
            projects: [
              {
                title: "Log Analyzer",
                description: "Read server logs and generate error reports, warning reports, and user activity reports using regex and advanced Python patterns.",
              },
            ],
            resources: [
              {
                label: "Python advanced tutorial",
                type: "Documentation",
                url: "https://docs.python.org/3/tutorial/classes.html#generators",
              },
              {
                label: "Advanced Python videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=advanced+python+decorators+generators",
              },
            ],
          },
          {
            id: "dsa-python",
            title: "Data Structures & Algorithms",
            summary: "Arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching.",
            description:
              "Improve coding and interview skills. Cover arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching. Used in logistics, maps, and ride-sharing applications.",
            level: "Intermediate",
            duration: "1 month",
            skills: ["Arrays & Linked Lists", "Stacks & Queues", "Trees & Graphs", "Sorting", "Searching"],
            projects: [
              {
                title: "Route Finder System",
                description: "Find the shortest path between locations using graph algorithms.",
              },
            ],
            resources: [
              {
                label: "LeetCode",
                type: "Practice",
                url: "https://leetcode.com/",
              },
              {
                label: "HackerRank Python",
                type: "Practice",
                url: "https://www.hackerrank.com/domains/python",
              },
            ],
          },
        ],
      },
      {
        id: "database-api-testing",
        index: "03",
        title: "Databases, APIs & Testing",
        description: "Store data, build APIs, and write reliable code.",
        topics: [
          {
            id: "sql-postgresql",
            title: "SQL & PostgreSQL",
            summary: "Joins, views, indexes, window functions, CTEs, and database design.",
            description:
              "Learn how applications store data. Master SQL with PostgreSQL — joins, views, indexes, window functions, CTEs, and database design. Almost every business application interacts with databases.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["SQL Joins", "Views & Indexes", "Window Functions", "CTEs", "PostgreSQL", "psycopg2"],
            projects: [
              {
                title: "Employee Management System",
                description: "Store employee information in PostgreSQL with departments, salary reports, and attendance tracking using Python + psycopg2.",
              },
            ],
            resources: [
              {
                label: "PostgreSQL tutorial",
                type: "Documentation",
                url: "https://www.postgresqltutorial.com/",
              },
              {
                label: "SQL practice",
                type: "Practice",
                url: "https://pgexercises.com/",
              },
            ],
          },
          {
            id: "fastapi-development",
            title: "API Development with FastAPI",
            summary: "REST APIs, request handling, response models, validation, and authentication.",
            description:
              "Learn how applications communicate. FastAPI is modern, performant, and widely used in data platforms. Cover REST APIs, request handling, response models, validation, and authentication.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["FastAPI", "REST APIs", "Request Handling", "Response Models", "Validation", "Authentication"],
            projects: [
              {
                title: "Employee API",
                description: "Build a full CRUD API with FastAPI + PostgreSQL + SQLAlchemy supporting GET, POST, PUT, DELETE endpoints.",
              },
            ],
            resources: [
              {
                label: "FastAPI tutorial",
                type: "Documentation",
                url: "https://fastapi.tiangolo.com/tutorial/",
              },
              {
                label: "FastAPI project videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=fastapi+project+tutorial",
              },
            ],
          },
          {
            id: "testing-python",
            title: "Testing with pytest",
            summary: "Unit testing, integration testing, mocking, and test automation.",
            description:
              "Write reliable code. Learn unit testing, integration testing, and mocking with pytest. Production systems require testing.",
            level: "Intermediate",
            duration: "1-2 weeks",
            skills: ["Unit Testing", "Integration Testing", "Mocking", "pytest"],
            projects: [
              {
                title: "Test Automation Framework",
                description: "Write comprehensive tests for the Employee API covering endpoints, edge cases, and database operations.",
              },
            ],
            resources: [
              {
                label: "pytest documentation",
                type: "Documentation",
                url: "https://docs.pytest.org/",
              },
              {
                label: "Python testing videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=pytest+tutorial+python",
              },
            ],
          },
        ],
      },
      {
        id: "data-analysis-visualization",
        index: "04",
        title: "Data Collection & Analysis",
        description: "Collect data from the web and analyze it with Python.",
        topics: [
          {
            id: "web-scraping",
            title: "Web Scraping & APIs",
            summary: "Requests, BeautifulSoup, Scrapy, and data collection pipelines.",
            description:
              "Learn how to collect data from the web. Master Requests, BeautifulSoup, and Scrapy. Data collection pipelines begin here.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Requests", "BeautifulSoup", "Scrapy", "Data Collection"],
            projects: [
              {
                title: "E-Commerce Price Tracker",
                description: "Collect product prices from websites and store them in PostgreSQL for trend analysis.",
              },
            ],
            resources: [
              {
                label: "BeautifulSoup documentation",
                type: "Documentation",
                url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/",
              },
              {
                label: "Web scraping tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=python+web+scraping+tutorial",
              },
            ],
          },
          {
            id: "pandas-numpy",
            title: "Data Analysis with Pandas & NumPy",
            summary: "Data cleaning, aggregation, transformations, and statistical analysis.",
            description:
              "Work with datasets using Pandas and NumPy. Learn data cleaning, aggregation, and transformations — the foundation for ETL pipelines.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["pandas", "NumPy", "Data Cleaning", "Aggregation", "Transformations"],
            projects: [
              {
                title: "Sales Analytics System",
                description: "Analyze revenue, profit, and product performance using Pandas and NumPy on real-world sales data.",
              },
            ],
            resources: [
              {
                label: "pandas getting started",
                type: "Documentation",
                url: "https://pandas.pydata.org/docs/getting_started/",
              },
              {
                label: "NumPy documentation",
                type: "Documentation",
                url: "https://numpy.org/doc/stable/",
              },
              {
                label: "Data analysis videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=pandas+data+analysis+project",
              },
            ],
          },
          {
            id: "visualization",
            title: "Data Visualization",
            summary: "Matplotlib, Plotly, dashboards, and business reporting.",
            description:
              "Present data effectively. Learn Matplotlib and Plotly to create charts showing sales, revenue, and customer trends. Executives consume data through dashboards.",
            level: "Intermediate",
            duration: "2 weeks",
            skills: ["Matplotlib", "Plotly", "Dashboard Design", "Business Reporting"],
            projects: [
              {
                title: "Business Dashboard",
                description: "Create interactive charts showing sales performance, revenue trends, and customer insights.",
              },
            ],
            resources: [
              {
                label: "Matplotlib documentation",
                type: "Documentation",
                url: "https://matplotlib.org/stable/contents.html",
              },
              {
                label: "Plotly documentation",
                type: "Documentation",
                url: "https://plotly.com/python/",
              },
            ],
          },
        ],
      },
      {
        id: "etl-airflow-spark",
        index: "05",
        title: "ETL, Orchestration & Big Data",
        description: "Build data pipelines, schedule them, and process at scale.",
        topics: [
          {
            id: "etl-pipelines",
            title: "ETL Development",
            summary: "Extract, transform, load, CSV to PostgreSQL pipelines.",
            description:
              "Connect Python skills to data engineering. Build ETL pipelines that extract data, transform it, and load it into databases. This is a core data engineering job responsibility.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Extract", "Transform", "Load", "CSV Processing", "Pipeline Design"],
            projects: [
              {
                title: "CSV to PostgreSQL Pipeline",
                description: "Build a pipeline that reads CSV files, transforms data with Pandas, and loads it into PostgreSQL.",
              },
            ],
            resources: [
              {
                label: "ETL concepts",
                type: "Documentation",
                url: "https://en.wikipedia.org/wiki/Extract,_transform,_load",
              },
              {
                label: "Python ETL tutorial",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=python+etl+pipeline+tutorial",
              },
            ],
          },
          {
            id: "airflow-orchestration",
            title: "Airflow Orchestration",
            summary: "DAGs, operators, scheduling, monitoring, and automated pipelines.",
            description:
              "Schedule pipelines with Apache Airflow. Learn DAGs, operators, scheduling, and monitoring. Used by thousands of companies to orchestrate data workflows.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["DAGs", "Operators", "Scheduling", "Monitoring"],
            projects: [
              {
                title: "Automated Daily ETL",
                description: "Schedule an Airflow DAG that reads CSV, transforms data, and loads it into PostgreSQL daily.",
              },
            ],
            resources: [
              {
                label: "Apache Airflow documentation",
                type: "Documentation",
                url: "https://airflow.apache.org/docs/",
              },
              {
                label: "Airflow tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=apache+airflow+tutorial",
              },
            ],
          },
          {
            id: "spark-big-data",
            title: "Spark & Big Data",
            summary: "PySpark, DataFrames, Spark SQL, partitioning, and large-scale processing.",
            description:
              "Python becomes slow with billions of records — Spark solves this. Learn PySpark DataFrames, Spark SQL, partitioning, and optimization for big data platforms.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["PySpark", "DataFrames", "Spark SQL", "Partitioning", "Optimization"],
            projects: [
              {
                title: "Big Data Processing",
                description: "Process 10 million+ records with PySpark: raw data → clean → aggregate → store.",
              },
            ],
            resources: [
              {
                label: "Apache Spark documentation",
                type: "Documentation",
                url: "https://spark.apache.org/docs/latest/",
              },
              {
                label: "PySpark tutorials",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=pyspark+tutorial+beginner",
              },
            ],
          },
        ],
      },
      {
        id: "streaming-cloud-advanced",
        index: "06",
        title: "Streaming, Cloud & Advanced DE",
        description: "Real-time systems, cloud infrastructure, and enterprise-grade data engineering.",
        topics: [
          {
            id: "kafka-streaming",
            title: "Kafka & Real-Time Streaming",
            summary: "Producers, consumers, topics, partitions, and streaming pipelines.",
            description:
              "Learn how Amazon, Uber, and Netflix handle real-time data. Master Kafka producers, consumers, topics, partitions, and offsets with Spark Streaming.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Kafka Producers", "Kafka Consumers", "Topics & Partitions", "Spark Streaming"],
            projects: [
              {
                title: "Real-Time Order Tracking",
                description: "Build a streaming pipeline: orders → Kafka → Spark Streaming → database.",
              },
            ],
            resources: [
              {
                label: "Apache Kafka documentation",
                type: "Documentation",
                url: "https://kafka.apache.org/documentation/",
              },
              {
                label: "Kafka tutorial videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=apache+kafka+tutorial",
              },
            ],
          },
          {
            id: "cloud-data-engineering",
            title: "Cloud Data Engineering",
            summary: "AWS S3, Lambda, Glue, Athena, Redshift, and cloud data platforms.",
            description:
              "Most modern companies use cloud platforms. Learn AWS services — S3, Lambda, Glue, Athena, Redshift — to build cloud-native data infrastructure.",
            level: "Advanced",
            duration: "4-6 weeks",
            skills: ["AWS S3", "AWS Lambda", "AWS Glue", "Athena", "Redshift"],
            projects: [
              {
                title: "Cloud Data Platform",
                description: "Build a cloud pipeline: API data → S3 → Glue → Redshift for analytics.",
              },
            ],
            resources: [
              {
                label: "AWS documentation",
                type: "Documentation",
                url: "https://docs.aws.amazon.com/",
              },
              {
                label: "AWS data engineering videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=aws+data+engineering+project",
              },
            ],
          },
          {
            id: "advanced-de-capstone",
            title: "Advanced DE & Final Capstone",
            summary: "dbt, Delta Lake, Iceberg, Docker, Kubernetes, CI/CD, data quality, monitoring, and enterprise platform.",
            description:
              "Master the modern data stack — dbt, Delta Lake, Iceberg. Learn Docker, Kubernetes, CI/CD, data quality with Great Expectations, and monitoring. Finish with an enterprise data platform that demonstrates everything from backend development to production DevOps.",
            level: "Advanced",
            duration: "6-8 weeks",
            skills: ["dbt", "Delta Lake", "Docker", "Kubernetes", "CI/CD", "Data Quality", "Monitoring", "Enterprise Architecture"],
            projects: [
              {
                title: "Enterprise Data Platform",
                description: "Build a complete platform: FastAPI → Kafka → Spark → S3 Data Lake → Delta Lake → Airflow → Snowflake → Power BI, containerized with Docker, orchestrated on Kubernetes, with CI/CD and monitoring.",
              },
            ],
            resources: [
              {
                label: "dbt documentation",
                type: "Documentation",
                url: "https://docs.getdbt.com/",
              },
              {
                label: "Delta Lake documentation",
                type: "Documentation",
                url: "https://docs.delta.io/latest/",
              },
              {
                label: "Docker documentation",
                type: "Documentation",
                url: "https://docs.docker.com/",
              },
              {
                label: "Kubernetes tutorial",
                type: "Documentation",
                url: "https://kubernetes.io/docs/tutorials/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "machine-learning",
    intro:
      "Machine learning is the core of AI. This roadmap takes you from mathematics and statistics fundamentals to building, evaluating, and deploying production ML models. Every stage builds on the previous one with real-world projects.",
    startTopicId: "ml-mathematics",
    stages: [
      {
        id: "ml-foundations",
        index: "01",
        title: "Mathematics & Statistics Foundations",
        description: "Build the mathematical intuition needed for all ML algorithms.",
        topics: [
          {
            id: "ml-mathematics",
            title: "Linear Algebra & Calculus",
            summary: "Vectors, matrices, eigenvalues, gradients, and optimization fundamentals.",
            description:
              "ML is built on math. Master vectors, matrices, matrix operations, eigenvalues, eigenvectors, derivatives, gradients, and partial derivatives. These are the building blocks of every ML algorithm.",
            level: "Start here",
            duration: "3-4 weeks",
            skills: ["Vectors & Matrices", "Matrix Operations", "Eigenvalues", "Derivatives", "Gradients", "Optimization"],
            projects: [
              {
                title: "Matrix Operations Library",
                description: "Implement matrix multiplication, transpose, inverse, and eigenvalue decomposition from scratch in Python.",
              },
            ],
            resources: [
              {
                label: "3Blue1Brown Linear Algebra",
                type: "Video",
                url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
              },
              {
                label: "Khan Academy Calculus",
                type: "Video",
                url: "https://www.khanacademy.org/math/multivariable-calculus",
              },
            ],
          },
          {
            id: "ml-statistics",
            title: "Probability & Statistics",
            summary: "Distributions, Bayes theorem, hypothesis testing, and statistical inference.",
            description:
              "Understand probability distributions, Bayes theorem, conditional probability, hypothesis testing, p-values, confidence intervals, and statistical inference. Critical for evaluating model performance.",
            level: "Foundation",
            duration: "3-4 weeks",
            skills: ["Probability Distributions", "Bayes Theorem", "Hypothesis Testing", "Statistical Inference", "p-values"],
            projects: [
              {
                title: "A/B Testing Analyzer",
                description: "Build a statistical A/B testing framework that calculates significance, confidence intervals, and effect sizes.",
              },
            ],
            resources: [
              {
                label: "Statistics with Python",
                type: "Documentation",
                url: "https://docs.scipy.org/doc/scipy/reference/stats.html",
              },
              {
                label: "StatQuest videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=statquest+probability+basics",
              },
            ],
          },
        ],
      },
      {
        id: "ml-core",
        index: "02",
        title: "Core Machine Learning",
        description: "Master the fundamental ML algorithms and scikit-learn.",
        topics: [
          {
            id: "ml-supervised",
            title: "Supervised Learning",
            summary: "Linear regression, logistic regression, decision trees, SVMs, and k-NN.",
            description:
              "Learn the workhorses of ML. Cover linear regression, logistic regression, decision trees, random forests, support vector machines, and k-nearest neighbors with scikit-learn.",
            level: "Intermediate",
            duration: "4-5 weeks",
            skills: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "SVMs", "k-NN", "scikit-learn"],
            projects: [
              {
                title: "House Price Predictor",
                description: "Build a regression model to predict house prices using multiple features with feature engineering and hyperparameter tuning.",
              },
              {
                title: "Customer Churn Classifier",
                description: "Build a classification model to predict customer churn with ROC curves, precision-recall, and feature importance analysis.",
              },
            ],
            resources: [
              {
                label: "scikit-learn documentation",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/",
              },
              {
                label: "ML course by Andrew Ng",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=andrew+ng+machine+learning+course",
              },
            ],
          },
          {
            id: "ml-unsupervised",
            title: "Unsupervised Learning",
            summary: "K-means, hierarchical clustering, DBSCAN, PCA, and t-SNE.",
            description:
              "Learn to find patterns in unlabeled data. Cover K-means, hierarchical clustering, DBSCAN for clustering, and PCA, t-SNE for dimensionality reduction and visualization.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["K-means", "Hierarchical Clustering", "DBSCAN", "PCA", "t-SNE"],
            projects: [
              {
                title: "Customer Segmentation Engine",
                description: "Segment customers based on purchasing behavior using clustering algorithms and visualize the segments with PCA.",
              },
            ],
            resources: [
              {
                label: "scikit-learn clustering",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/modules/clustering.html",
              },
              {
                label: "Unsupervised learning videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=unsupervised+learning+clustering+tutorial",
              },
            ],
          },
          {
            id: "ml-ensembles",
            title: "Ensemble Methods & Advanced Techniques",
            summary: "Bagging, boosting, XGBoost, LightGBM, CatBoost, and hyperparameter tuning.",
            description:
              "Ensemble methods win competitions. Learn bagging, boosting, gradient boosting, XGBoost, LightGBM, CatBoost, and hyperparameter tuning with GridSearchCV and Optuna.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["Bagging", "Boosting", "XGBoost", "LightGBM", "CatBoost", "Hyperparameter Tuning", "Optuna"],
            projects: [
              {
                title: "Kaggle Competition Solution",
                description: "Build a top-performing ensemble model for a Kaggle competition with feature engineering, cross-validation, and hyperparameter optimization.",
              },
            ],
            resources: [
              {
                label: "XGBoost documentation",
                type: "Documentation",
                url: "https://xgboost.readthedocs.io/",
              },
              {
                label: "LightGBM documentation",
                type: "Documentation",
                url: "https://lightgbm.readthedocs.io/",
              },
            ],
          },
        ],
      },
      {
        id: "ml-features-evaluation",
        index: "03",
        title: "Feature Engineering & Model Evaluation",
        description: "Build better features and rigorously evaluate model performance.",
        topics: [
          {
            id: "ml-feature-engineering",
            title: "Feature Engineering",
            summary: "Feature encoding, scaling, selection, extraction, and handling missing data.",
            description:
              "Features define model performance. Master encoding categorical variables, scaling numerical features, feature selection, feature extraction, handling missing data, and creating interaction features.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Feature Encoding", "Feature Scaling", "Feature Selection", "Feature Extraction", "Missing Data Handling"],
            projects: [
              {
                title: "Feature Engineering Pipeline",
                description: "Build an automated feature engineering pipeline that handles encoding, scaling, selection, and creates derived features.",
              },
            ],
            resources: [
              {
                label: "Feature engineering guide",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/modules/preprocessing.html",
              },
              {
                label: "Feature engineering videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=feature+engineering+for+machine+learning",
              },
            ],
          },
          {
            id: "ml-evaluation",
            title: "Model Evaluation & Validation",
            summary: "Cross-validation, metrics, bias-variance tradeoff, overfitting, and model selection.",
            description:
              "Choose and validate models properly. Learn cross-validation strategies, classification and regression metrics, bias-variance tradeoff, overfitting detection, learning curves, and model selection.",
            level: "Intermediate",
            duration: "2 weeks",
            skills: ["Cross-Validation", "Classification Metrics", "Regression Metrics", "Bias-Variance Tradeoff", "Learning Curves"],
            projects: [
              {
                title: "Model Evaluation Framework",
                description: "Build a comprehensive model evaluation framework with multiple CV strategies, metrics, learning curves, and model comparison reports.",
              },
            ],
            resources: [
              {
                label: "Model evaluation guide",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/modules/cross_validation.html",
              },
              {
                label: "ML model evaluation videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=machine+learning+model+evaluation+metrics",
              },
            ],
          },
        ],
      },
      {
        id: "ml-production",
        index: "04",
        title: "MLOps & Production ML",
        description: "Deploy, monitor, and maintain ML models in production.",
        topics: [
          {
            id: "ml-pipelines",
            title: "ML Pipelines & Deployment",
            summary: "MLflow, model serialization, REST APIs, Docker, and cloud deployment.",
            description:
              "Take models to production. Learn MLflow for experiment tracking, model serialization with ONNX, building ML APIs with FastAPI, containerizing with Docker, and cloud deployment on AWS SageMaker or GCP Vertex AI.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["MLflow", "ONNX", "FastAPI", "Docker", "AWS SageMaker", "GCP Vertex AI"],
            projects: [
              {
                title: "Production ML API",
                description: "Deploy a trained model as a REST API with FastAPI, Docker, experiment tracking with MLflow, and cloud deployment on AWS SageMaker.",
              },
            ],
            resources: [
              {
                label: "MLflow documentation",
                type: "Documentation",
                url: "https://mlflow.org/docs/latest/",
              },
              {
                label: "AWS SageMaker guide",
                type: "Documentation",
                url: "https://docs.aws.amazon.com/sagemaker/",
              },
            ],
          },
          {
            id: "ml-monitoring",
            title: "Model Monitoring & Retraining",
            summary: "Data drift, concept drift, model decay, automated retraining, and A/B testing.",
            description:
              "Models degrade in production. Learn to detect data drift and concept drift, monitor model decay, set up automated retraining pipelines, and run A/B tests on model versions.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Data Drift", "Concept Drift", "Model Monitoring", "Automated Retraining", "A/B Testing"],
            projects: [
              {
                title: "Model Monitoring System",
                description: "Build a monitoring system that tracks model performance, detects drift, triggers alerts, and automates retraining.",
              },
            ],
            resources: [
              {
                label: "Evidently AI monitoring",
                type: "Documentation",
                url: "https://www.evidentlyai.com/",
              },
              {
                label: "MLOps best practices",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=mlops+model+monitoring+drift",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "deep-learning",
    intro:
      "Deep learning powers modern AI — from computer vision to speech recognition. This roadmap takes you from neural network fundamentals to advanced architectures with PyTorch and TensorFlow.",
    startTopicId: "dl-neural-networks",
    stages: [
      {
        id: "dl-fundamentals",
        index: "01",
        title: "Neural Network Fundamentals",
        description: "Understand how neural networks learn.",
        topics: [
          {
            id: "dl-neural-networks",
            title: "Neural Networks & Backpropagation",
            summary: "Perceptrons, activation functions, forward pass, backpropagation, gradient descent, and loss functions.",
            description:
              "Build neural networks from scratch. Master perceptrons, activation functions (ReLU, sigmoid, tanh, softmax), forward and backward propagation, gradient descent variants, and loss functions.",
            level: "Start here",
            duration: "3-4 weeks",
            skills: ["Perceptrons", "Activation Functions", "Backpropagation", "Gradient Descent", "Loss Functions"],
            projects: [
              {
                title: "Neural Network from Scratch",
                description: "Implement a multi-layer neural network with backpropagation using only NumPy, then train it on MNIST.",
              },
            ],
            resources: [
              {
                label: "Neural Networks and Deep Learning",
                type: "Documentation",
                url: "http://neuralnetworksanddeeplearning.com/",
              },
              {
                label: "3Blue1Brown Neural Networks",
                type: "Video",
                url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
              },
            ],
          },
          {
            id: "dl-pytorch-tensorflow",
            title: "PyTorch & TensorFlow Basics",
            summary: "Tensors, autograd, datasets, data loaders, and training loops.",
            description:
              "Learn the two major deep learning frameworks. Master tensors, automatic differentiation, datasets, data loaders, model definition, training loops, and GPU acceleration with both PyTorch and TensorFlow.",
            level: "Foundation",
            duration: "3-4 weeks",
            skills: ["PyTorch", "TensorFlow", "Tensors", "Autograd", "Data Loaders", "GPU Training"],
            projects: [
              {
                title: "Image Classifier with PyTorch",
                description: "Build an image classifier on CIFAR-10 using PyTorch with custom data loaders, GPU training, and model checkpointing.",
              },
              {
                title: "Image Classifier with TensorFlow",
                description: "Build the same classifier using TensorFlow/Keras to understand framework differences.",
              },
            ],
            resources: [
              {
                label: "PyTorch tutorial",
                type: "Documentation",
                url: "https://pytorch.org/tutorials/",
              },
              {
                label: "TensorFlow tutorial",
                type: "Documentation",
                url: "https://www.tensorflow.org/tutorials",
              },
            ],
          },
        ],
      },
      {
        id: "dl-architectures",
        index: "02",
        title: "Deep Learning Architectures",
        description: "Master CNNs, RNNs, and sequence models.",
        topics: [
          {
            id: "dl-cnn",
            title: "Convolutional Neural Networks",
            summary: "Convolutions, pooling, batch norm, dropout, ResNet, and transfer learning.",
            description:
              "CNVs revolutionized computer vision. Learn convolutions, pooling, batch normalization, dropout, data augmentation, transfer learning, and architectures like ResNet, VGG, and EfficientNet.",
            level: "Intermediate",
            duration: "4-5 weeks",
            skills: ["Convolutions", "Pooling", "Batch Normalization", "Data Augmentation", "Transfer Learning", "ResNet", "EfficientNet"],
            projects: [
              {
                title: "Real-Time Object Detector",
                description: "Build a real-time object detection system using YOLO with transfer learning and custom dataset training.",
              },
              {
                title: "Medical Image Classifier",
                description: "Fine-tune a pre-trained ResNet on a medical imaging dataset for disease classification.",
              },
            ],
            resources: [
              {
                label: "CS231n CNN course",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=stanford+cs231n+cnn",
              },
              {
                label: "PyTorch image models",
                type: "Documentation",
                url: "https://pytorch.org/vision/stable/models.html",
              },
            ],
          },
          {
            id: "dl-rnn-lstm",
            title: "RNNs, LSTMs & GRUs",
            summary: "Recurrent networks, vanishing gradients, LSTMs, GRUs, and sequence modeling.",
            description:
              "Process sequential data. Learn recurrent neural networks, the vanishing gradient problem, LSTMs and GRUs, bidirectional RNNs, and sequence-to-sequence architectures for time series and text.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["RNNs", "Vanishing Gradients", "LSTMs", "GRUs", "Bidirectional RNNs", "Seq2Seq"],
            projects: [
              {
                title: "Stock Price Predictor",
                description: "Build an LSTM model to predict stock prices from historical time series data with sequence preprocessing.",
              },
              {
                title: "Text Generator",
                description: "Train a character-level LSTM to generate text in the style of Shakespeare or any corpus.",
              },
            ],
            resources: [
              {
                label: "CS224n NLP course",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=stanford+cs224n+nlp",
              },
              {
                label: "PyTorch RNN tutorial",
                type: "Documentation",
                url: "https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html",
              },
            ],
          },
          {
            id: "dl-autoencoders-gan",
            title: "Autoencoders & GANs",
            summary: "Autoencoders, variational autoencoders, GANs, and generative modeling.",
            description:
              "Generate new data. Learn autoencoders, variational autoencoders (VAEs), generative adversarial networks (GANs), DCGANs, and advanced GAN architectures for image generation.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Autoencoders", "VAEs", "GANs", "DCGANs", "Generative Modeling"],
            projects: [
              {
                title: "Anime Face Generator",
                description: "Train a DCGAN to generate realistic anime faces, with latent space interpolation and mode collapse handling.",
              },
              {
                title: "Anomaly Detector",
                description: "Build an autoencoder-based anomaly detection system for manufacturing quality control.",
              },
            ],
            resources: [
              {
                label: "GAN tutorial PyTorch",
                type: "Documentation",
                url: "https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html",
              },
              {
                label: "GANs specialization",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=gan+course+deeplearning+ai",
              },
            ],
          },
        ],
      },
      {
        id: "dl-advanced",
        index: "03",
        title: "Advanced Deep Learning",
        description: "Cutting-edge architectures and techniques.",
        topics: [
          {
            id: "dl-transformers",
            title: "Transformers & Attention",
            summary: "Self-attention, multi-head attention, positional encoding, and transformer architecture.",
            description:
              "Transformers dominate modern DL. Master self-attention, multi-head attention, positional encoding, encoder-decoder architecture, and implement a transformer from scratch.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Self-Attention", "Multi-Head Attention", "Positional Encoding", "Transformer Architecture"],
            projects: [
              {
                title: "Transformer from Scratch",
                description: "Implement a transformer model from scratch in PyTorch and train it for machine translation.",
              },
            ],
            resources: [
              {
                label: "Attention Is All You Need paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/1706.03762",
              },
              {
                label: "The Annotated Transformer",
                type: "Documentation",
                url: "http://nlp.seas.harvard.edu/2018/04/03/attention.html",
              },
            ],
          },
          {
            id: "dl-advanced-training",
            title: "Advanced Training Techniques",
            summary: "Mixed precision, distributed training, hyperparameter optimization, and model pruning.",
            description:
              "Train large models efficiently. Learn mixed precision training, distributed data parallel, gradient accumulation, hyperparameter optimization with Optuna, model pruning, and quantization.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Mixed Precision", "Distributed Training", "Gradient Accumulation", "Optuna", "Model Pruning", "Quantization"],
            projects: [
              {
                title: "Distributed Training Pipeline",
                description: "Train a large model across multiple GPUs using distributed data parallel with mixed precision and hyperparameter optimization.",
              },
            ],
            resources: [
              {
                label: "PyTorch distributed training",
                type: "Documentation",
                url: "https://pytorch.org/tutorials/intermediate/ddp_tutorial.html",
              },
              {
                label: "Hugging Face Optuna",
                type: "Documentation",
                url: "https://optuna.org/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "nlp",
    intro:
      "Natural Language Processing enables machines to understand and generate human language. This roadmap takes you from text preprocessing to cutting-edge transformer models and production NLP systems.",
    startTopicId: "nlp-text-preprocessing",
    stages: [
      {
        id: "nlp-fundamentals",
        index: "01",
        title: "NLP Fundamentals",
        description: "Process and understand text data.",
        topics: [
          {
            id: "nlp-text-preprocessing",
            title: "Text Preprocessing & Linguistics",
            summary: "Tokenization, stemming, lemmatization, POS tagging, NER, and regex for text.",
            description:
              "Every NLP pipeline starts with text preprocessing. Master tokenization, stemming, lemmatization, part-of-speech tagging, named entity recognition, stop word removal, and regular expressions for text cleaning.",
            level: "Start here",
            duration: "2-3 weeks",
            skills: ["Tokenization", "Stemming", "Lemmatization", "POS Tagging", "NER", "Text Cleaning", "Regex"],
            projects: [
              {
                title: "Text Preprocessing Pipeline",
                description: "Build a comprehensive text preprocessing pipeline that handles cleaning, tokenization, normalization, and feature extraction for any text dataset.",
              },
            ],
            resources: [
              {
                label: "NLTK documentation",
                type: "Documentation",
                url: "https://www.nltk.org/",
              },
              {
                label: "spaCy documentation",
                type: "Documentation",
                url: "https://spacy.io/usage",
              },
              {
                label: "NLP preprocessing videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=nlp+text+preprocessing+tutorial",
              },
            ],
          },
          {
            id: "nlp-embeddings",
            title: "Word Embeddings & Vector Semantics",
            summary: "Word2Vec, GloVe, FastText, embeddings, and semantic similarity.",
            description:
              "Represent words as vectors. Learn Word2Vec (CBOW, Skip-gram), GloVe, FastText, embedding visualization with t-SNE, cosine similarity, and analogies.",
            level: "Foundation",
            duration: "2-3 weeks",
            skills: ["Word2Vec", "GloVe", "FastText", "Embedding Visualization", "Cosine Similarity"],
            projects: [
              {
                title: "Word Analogy Solver",
                description: "Train Word2Vec on a large corpus and build a word analogy solver (king - man + woman = queen).",
              },
            ],
            resources: [
              {
                label: "Gensim documentation",
                type: "Documentation",
                url: "https://radimrehurek.com/gensim/",
              },
              {
                label: "Word embeddings explained",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=word2vec+explained+clearly",
              },
            ],
          },
        ],
      },
      {
        id: "nlp-classical",
        index: "02",
        title: "Classical NLP & Sequence Models",
        description: "Traditional NLP approaches and sequence modeling.",
        topics: [
          {
            id: "nlp-classical-ml",
            title: "Classical NLP with ML",
            summary: "Bag of words, TF-IDF, text classification, sentiment analysis, and topic modeling.",
            description:
              "Apply ML to text. Learn bag of words, TF-IDF, n-grams, text classification, sentiment analysis, spam detection, and topic modeling with LDA and NMF.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["Bag of Words", "TF-IDF", "Text Classification", "Sentiment Analysis", "Topic Modeling", "LDA"],
            projects: [
              {
                title: "Sentiment Analysis System",
                description: "Build a movie review sentiment classifier using TF-IDF features with logistic regression, SVM, and Naive Bayes.",
              },
              {
                title: "News Topic Classifier",
                description: "Build a multi-class text classifier that categorizes news articles into topics with LDA for topic discovery.",
              },
            ],
            resources: [
              {
                label: "scikit-learn text tutorial",
                type: "Documentation",
                url: "https://scikit-learn.org/stable/tutorial/text_analytics/working_with_text_data.html",
              },
              {
                label: "NLP classification videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=text+classification+nlp+tutorial",
              },
            ],
          },
          {
            id: "nlp-seq2seq",
            title: "Sequence-to-Sequence & Attention",
            summary: "Seq2Seq, encoder-decoder, attention mechanism, and machine translation.",
            description:
              "Powerful sequence modeling. Learn encoder-decoder architecture, seq2seq with RNNs, attention mechanism, teacher forcing, beam search, and build a machine translation system.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["Seq2Seq", "Encoder-Decoder", "Attention Mechanism", "Beam Search", "Machine Translation"],
            projects: [
              {
                title: "Language Translator",
                description: "Build a neural machine translation system from French to English using seq2seq with attention in PyTorch.",
              },
            ],
            resources: [
              {
                label: "Seq2Seq with PyTorch",
                type: "Documentation",
                url: "https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html",
              },
              {
                label: "Attention mechanism explained",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=attention+mechanism+in+nlp",
              },
            ],
          },
        ],
      },
      {
        id: "nlp-transformers",
        index: "03",
        title: "Transformers & Pre-trained Models",
        description: "Master transformer-based NLP models.",
        topics: [
          {
            id: "nlp-bert",
            title: "BERT & Encoder Models",
            summary: "BERT, RoBERTa, DistilBERT, fine-tuning for classification, NER, and QA.",
            description:
              "BERT changed NLP forever. Learn BERT architecture, masked language modeling, fine-tuning for text classification, NER, question answering, and models like RoBERTa, DistilBERT, and ALBERT.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["BERT", "RoBERTa", "Fine-tuning", "Text Classification", "NER", "Question Answering", "Hugging Face"],
            projects: [
              {
                title: "Question Answering System",
                description: "Fine-tune BERT on SQuAD to build a question answering system using Hugging Face Transformers.",
              },
              {
                title: "Custom NER Model",
                description: "Fine-tune RoBERTa for a domain-specific named entity recognition task (medical, legal, or financial).",
              },
            ],
            resources: [
              {
                label: "Hugging Face course",
                type: "Documentation",
                url: "https://huggingface.co/learn/nlp-course",
              },
              {
                label: "BERT explained videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=bert+model+explained",
              },
            ],
          },
          {
            id: "nlp-gpt",
            title: "GPT & Decoder Models",
            summary: "GPT, autoregressive generation, prompt engineering, and text generation.",
            description:
              "Understand decoder-only models. Learn GPT architecture, autoregressive text generation, temperature scaling, top-k and top-p sampling, prompt engineering, and in-context learning.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["GPT", "Autoregressive Generation", "Temperature Scaling", "Top-k Sampling", "Prompt Engineering", "In-Context Learning"],
            projects: [
              {
                title: "Text Generation App",
                description: "Build a text generation application using GPT-2/GPT-Neo with controllable generation parameters and prompt templates.",
              },
            ],
            resources: [
              {
                label: "OpenAI GPT documentation",
                type: "Documentation",
                url: "https://platform.openai.com/docs/guides/gpt",
              },
              {
                label: "Hugging Face generation",
                type: "Documentation",
                url: "https://huggingface.co/docs/transformers/tasks/language_modeling",
              },
            ],
          },
        ],
      },
      {
        id: "nlp-advanced",
        index: "04",
        title: "Advanced NLP & Production",
        description: "State-of-the-art NLP and deployment.",
        topics: [
          {
            id: "nlp-advanced-topics",
            title: "Advanced NLP Topics",
            summary: "Multilingual models, cross-lingual transfer, speech NLP, and multimodal models.",
            description:
              "Push NLP further. Learn multilingual BERT, XLM-R for cross-lingual transfer, speech-to-text with Whisper, multimodal models like CLIP, and document understanding with LayoutLM.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Multilingual BERT", "XLM-R", "Cross-Lingual Transfer", "Whisper", "CLIP", "LayoutLM"],
            projects: [
              {
                title: "Multilingual Sentiment Analyzer",
                description: "Build a sentiment analysis model that works across 10+ languages using XLM-R with zero-shot cross-lingual transfer.",
              },
            ],
            resources: [
              {
                label: "Hugging Face multilingual",
                type: "Documentation",
                url: "https://huggingface.co/docs/transformers/multilingual",
              },
              {
                label: "Whisper by OpenAI",
                type: "Documentation",
                url: "https://github.com/openai/whisper",
              },
            ],
          },
          {
            id: "nlp-production",
            title: "NLP in Production",
            summary: "Model optimization, ONNX, deployment, monitoring, and scaling NLP systems.",
            description:
              "Deploy NLP models at scale. Learn model optimization with ONNX and quantization, deployment with FastAPI and Docker, monitoring for drift, handling long documents, and scaling with batch processing.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Model Optimization", "ONNX", "Quantization", "FastAPI", "Docker", "NLP Monitoring"],
            projects: [
              {
                title: "Production NLP API",
                description: "Deploy a fine-tuned BERT model as a production REST API with ONNX optimization, Docker, and monitoring.",
              },
            ],
            resources: [
              {
                label: "ONNX documentation",
                type: "Documentation",
                url: "https://onnxruntime.ai/",
              },
              {
                label: "Hugging Face optimization",
                type: "Documentation",
                url: "https://huggingface.co/docs/optimum/index",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "llm",
    intro:
      "Large Language Models have revolutionized AI. This roadmap covers everything from transformer architecture to building production-grade LLM applications with RAG, fine-tuning, and deployment.",
    startTopicId: "llm-transformer-architecture",
    stages: [
      {
        id: "llm-foundations",
        index: "01",
        title: "LLM Foundations",
        description: "Understand the transformer architecture behind all LLMs.",
        topics: [
          {
            id: "llm-transformer-architecture",
            title: "Transformer Architecture Deep Dive",
            summary: "Scaled dot-product attention, multi-head attention, positional encoding, layer norm, and feed-forward networks.",
            description:
              "All modern LLMs are transformers. Deep-dive into scaled dot-product attention, multi-head attention, rotary and relative positional encodings, pre-layer norm, and the feed-forward network block. Build one from scratch.",
            level: "Start here",
            duration: "3-4 weeks",
            skills: ["Scaled Dot-Product Attention", "Multi-Head Attention", "Positional Encodings", "Layer Norm", "FFN Blocks"],
            projects: [
              {
                title: "GPT Implementation from Scratch",
                description: "Implement a miniature GPT-style transformer from scratch in PyTorch, including attention, training loop, and text generation.",
              },
            ],
            resources: [
              {
                label: "Attention Is All You Need paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/1706.03762",
              },
              {
                label: "Andrej Karpathy GPT video",
                type: "Video",
                url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
              },
              {
                label: "The Annotated Transformer",
                type: "Documentation",
                url: "http://nlp.seas.harvard.edu/2018/04/03/attention.html",
              },
            ],
          },
          {
            id: "llm-pretraining",
            title: "Pre-training & Scaling Laws",
            summary: "Pre-training objectives, data curation, scaling laws, and compute-optimal training.",
            description:
              "Understand how LLMs are pre-trained. Learn autoregressive language modeling, data curation at scale, scaling laws (Kaplan, Chinchilla), compute-optimal training, and the impact of data quality and model size.",
            level: "Foundation",
            duration: "2-3 weeks",
            skills: ["Autoregressive LM", "Data Curation", "Scaling Laws", "Compute-Optimal Training"],
            projects: [
              {
                title: "Scaling Law Analysis",
                description: "Train small models at different scales and analyze loss curves to empirically observe scaling laws.",
              },
            ],
            resources: [
              {
                label: "Scaling Laws paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2001.08361",
              },
              {
                label: "Chinchilla paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2203.15556",
              },
            ],
          },
        ],
      },
      {
        id: "llm-fine-tuning",
        index: "02",
        title: "Fine-tuning & Alignment",
        description: "Adapt pre-trained LLMs to specific tasks and align with human preferences.",
        topics: [
          {
            id: "llm-fine-tuning",
            title: "Fine-tuning Methods",
            summary: "Full fine-tuning, LoRA, QLoRA, PEFT, and adapter-based tuning.",
            description:
              "Fine-tune LLMs efficiently. Learn full fine-tuning, Low-Rank Adaptation (LoRA), QLoRA for memory-efficient fine-tuning, PEFT methods, prompt tuning, and soft prompts.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Full Fine-tuning", "LoRA", "QLoRA", "PEFT", "Prompt Tuning", "Hugging Face PEFT"],
            projects: [
              {
                title: "Domain-Specific LLM",
                description: "Fine-tune LLaMA or Mistral on a domain-specific dataset using LoRA and QLoRA, evaluating on domain benchmarks.",
              },
            ],
            resources: [
              {
                label: "LoRA paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2106.09685",
              },
              {
                label: "Hugging Face PEFT",
                type: "Documentation",
                url: "https://huggingface.co/docs/peft/index",
              },
              {
                label: "Fine-tuning LLM videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=fine+tune+llama+with+lora",
              },
            ],
          },
          {
            id: "llm-rlhf",
            title: "RLHF & Alignment",
            summary: "RLHF, DPO, reward modeling, supervised fine-tuning, and constitutional AI.",
            description:
              "Align LLMs with human values. Learn Reinforcement Learning from Human Feedback (RLHF), Direct Preference Optimization (DPO), reward modeling, supervised fine-tuning, and constitutional AI approaches.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["RLHF", "DPO", "Reward Modeling", "SFT", "Constitutional AI"],
            projects: [
              {
                title: "RLHF Training Pipeline",
                description: "Implement a complete RLHF pipeline with supervised fine-tuning, reward model training, and PPO optimization.",
              },
            ],
            resources: [
              {
                label: "RLHF paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2203.02155",
              },
              {
                label: "DPO paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2305.18290",
              },
            ],
          },
        ],
      },
      {
        id: "llm-rag",
        index: "03",
        title: "RAG & Retrieval Systems",
        description: "Build retrieval-augmented generation systems for grounded LLM outputs.",
        topics: [
          {
            id: "llm-embeddings-vectors",
            title: "Embeddings & Vector Databases",
            summary: "Text embeddings, vector databases (Pinecone, Weaviate, Chroma), and semantic search.",
            description:
              "The foundation of RAG. Learn text embeddings from models like Sentence-BERT and OpenAI ada, vector databases (Pinecone, Weaviate, Chroma, Qdrant), semantic search, and hybrid search with dense + sparse vectors.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Text Embeddings", "Sentence-BERT", "Pinecone", "Weaviate", "Chroma", "Semantic Search", "Hybrid Search"],
            projects: [
              {
                title: "Semantic Search Engine",
                description: "Build a semantic search engine over a document corpus using embeddings and a vector database with hybrid search capabilities.",
              },
            ],
            resources: [
              {
                label: "Pinecone documentation",
                type: "Documentation",
                url: "https://docs.pinecone.io/",
              },
              {
                label: "Sentence-BERT documentation",
                type: "Documentation",
                url: "https://www.sbert.net/",
              },
            ],
          },
          {
            id: "llm-rag-pipelines",
            title: "RAG Pipeline Architecture",
            summary: "Document chunking, retrieval strategies, context augmentation, and response generation.",
            description:
              "Build production RAG systems. Learn document chunking strategies, retrieval (dense, sparse, hybrid), context augmentation, re-ranking, query rewriting, and response generation with citations.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Document Chunking", "Dense Retrieval", "Re-ranking", "Query Rewriting", "Context Augmentation", "Citation Generation"],
            projects: [
              {
                title: "Chat with Documents RAG System",
                description: "Build a complete RAG system that answers questions from PDF documents with chunking, retrieval, re-ranking, and cited responses.",
              },
            ],
            resources: [
              {
                label: "LangChain RAG guide",
                type: "Documentation",
                url: "https://python.langchain.com/docs/use_cases/question_answering/",
              },
              {
                label: "LlamaIndex documentation",
                type: "Documentation",
                url: "https://docs.llamaindex.ai/",
              },
              {
                label: "Advanced RAG techniques",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=advanced+rag+techniques",
              },
            ],
          },
        ],
      },
      {
        id: "llm-prompting",
        index: "04",
        title: "Prompt Engineering & Evaluation",
        description: "Master prompt engineering and rigorous evaluation of LLM outputs.",
        topics: [
          {
            id: "llm-prompt-engineering",
            title: "Prompt Engineering",
            summary: "Zero-shot, few-shot, chain-of-thought, ReAct, and structured prompting techniques.",
            description:
              "Get the best from LLMs through prompts. Learn zero-shot and few-shot prompting, chain-of-thought reasoning, self-consistency, ReAct, tree-of-thoughts, and structured output formatting.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Zero-Shot Prompting", "Few-Shot Prompting", "Chain-of-Thought", "ReAct", "Self-Consistency", "Structured Output"],
            projects: [
              {
                title: "Prompt Engineering Playground",
                description: "Build a prompt engineering playground that tests different prompting strategies on various LLMs with output comparison.",
              },
            ],
            resources: [
              {
                label: "OpenAI prompt engineering guide",
                type: "Documentation",
                url: "https://platform.openai.com/docs/guides/prompt-engineering",
              },
              {
                label: "Prompt Engineering videos",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=prompt+engineering+best+practices",
              },
            ],
          },
          {
            id: "llm-evaluation",
            title: "LLM Evaluation & Safety",
            summary: "Benchmarks, human evaluation, bias detection, hallucinations, safety, and red-teaming.",
            description:
              "Evaluate and safeguard LLMs. Learn standard benchmarks (MMLU, HumanEval, HELM), human evaluation frameworks, hallucination detection, bias measurement, content safety, and red-teaming.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["LLM Benchmarks", "Human Evaluation", "Hallucination Detection", "Bias Measurement", "Content Safety", "Red-Teaming"],
            projects: [
              {
                title: "LLM Evaluation Suite",
                description: "Build an evaluation suite that tests an LLM on multiple benchmarks, detects hallucinations, and measures bias and safety.",
              },
            ],
            resources: [
              {
                label: "HELM benchmark",
                type: "Documentation",
                url: "https://crfm.stanford.edu/helm/latest/",
              },
              {
                label: "LLM safety evaluation",
                type: "Documentation",
                url: "https://llm-evaluation.github.io/",
              },
            ],
          },
        ],
      },
      {
        id: "llm-production",
        index: "05",
        title: "Production LLM Applications",
        description: "Deploy and scale LLM applications in production.",
        topics: [
          {
            id: "llm-serving",
            title: "LLM Serving & Deployment",
            summary: "vLLM, TGI, quantization, caching, rate limiting, and deployment at scale.",
            description:
              "Serve LLMs efficiently. Learn vLLM for high-throughput serving, TensorRT-LLM, model quantization (GPTQ, AWQ), KV-cache optimization, semantic caching, rate limiting, and autoscaling.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["vLLM", "TensorRT-LLM", "GPTQ", "AWQ", "KV-Cache", "Semantic Caching", "Autoscaling"],
            projects: [
              {
                title: "Production LLM API",
                description: "Deploy an LLM with vLLM, add semantic caching with Redis, implement rate limiting, and scale with Kubernetes.",
              },
            ],
            resources: [
              {
                label: "vLLM documentation",
                type: "Documentation",
                url: "https://docs.vllm.ai/",
              },
              {
                label: "Hugging Face TGI",
                type: "Documentation",
                url: "https://huggingface.co/docs/text-generation-inference/index",
              },
            ],
          },
          {
            id: "llm-monitoring",
            title: "LLM Monitoring & Observability",
            summary: "Latency tracking, token usage, cost monitoring, guardrails, and continuous evaluation.",
            description:
              "Monitor LLMs in production. Track latency, token usage and cost, set up guardrails with NeMo Guardrails, implement continuous evaluation, and detect prompt injection and jailbreaks.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Latency Monitoring", "Cost Tracking", "Guardrails", "Prompt Injection Detection", "Continuous Evaluation"],
            projects: [
              {
                title: "LLM Observability Platform",
                description: "Build a monitoring system that tracks LLM performance, costs, safety violations, and runs continuous evaluations.",
              },
            ],
            resources: [
              {
                label: "NeMo Guardrails",
                type: "Documentation",
                url: "https://github.com/NVIDIA/NeMo-Guardrails",
              },
              {
                label: "LangSmith monitoring",
                type: "Documentation",
                url: "https://docs.smith.langchain.com/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "agentic-ai",
    intro:
      "Agentic AI is the next frontier — autonomous systems that plan, reason, use tools, and take actions. This roadmap covers everything from agent architectures to production multi-agent systems.",
    startTopicId: "agent-architectures",
    stages: [
      {
        id: "agent-foundations",
        index: "01",
        title: "Agent Foundations",
        description: "Understand agent architectures and core components.",
        topics: [
          {
            id: "agent-architectures",
            title: "Agent Architectures",
            summary: "ReAct, Plan-and-Execute, reflection, task decomposition, and tool use patterns.",
            description:
              "Understand the core patterns that power modern AI agents. Learn ReAct (Reasoning + Acting), Plan-and-Execute, reflection loops, task decomposition, and tool use patterns that form the foundation of agentic systems.",
            level: "Start here",
            duration: "2-3 weeks",
            skills: ["ReAct Pattern", "Plan-and-Execute", "Reflection", "Task Decomposition", "Tool Use"],
            projects: [
              {
                title: "ReAct Agent from Scratch",
                description: "Implement a ReAct agent from scratch using an LLM that reasons, decides tools to call, and acts on the results.",
              },
            ],
            resources: [
              {
                label: "ReAct paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2210.03629",
              },
              {
                label: "LangChain agent concepts",
                type: "Documentation",
                url: "https://python.langchain.com/docs/modules/agents/",
              },
              {
                label: "Agent architectures video",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=ai+agent+architecture+react+pattern",
              },
            ],
          },
          {
            id: "agent-llm-backbone",
            title: "LLM Backbone & Function Calling",
            summary: "LLMs as reasoning engines, function calling, structured outputs, and context management.",
            description:
              "LLMs are the brain of agents. Master function calling, structured output formats (JSON mode), context window management, and using LLMs as reasoning engines that drive agent decisions.",
            level: "Foundation",
            duration: "2-3 weeks",
            skills: ["Function Calling", "Structured Outputs", "JSON Mode", "Context Management", "LLM Reasoning"],
            projects: [
              {
                title: "Function Calling Playground",
                description: "Build an agent that uses OpenAI function calling to query databases, call APIs, and process results in a loop.",
              },
            ],
            resources: [
              {
                label: "OpenAI function calling",
                type: "Documentation",
                url: "https://platform.openai.com/docs/guides/function-calling",
              },
              {
                label: "Anthropic tool use",
                type: "Documentation",
                url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use",
              },
            ],
          },
        ],
      },
      {
        id: "agent-tools-memory",
        index: "02",
        title: "Tools, Memory & Frameworks",
        description: "Equip agents with tools, memory, and use agent frameworks.",
        topics: [
          {
            id: "agent-tools",
            title: "Tool Building & Integration",
            summary: "Custom tool creation, API integration, code execution, web browsing, and file operations.",
            description:
              "Agents are only as powerful as their tools. Learn to build custom tools for code execution, web browsing, API integration, file operations, database queries, and search capabilities.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["Custom Tool Creation", "Code Execution", "Web Browsing", "API Integration", "Database Tools", "Search Tools"],
            projects: [
              {
                title: "Research Agent with Tools",
                description: "Build an agent that researches topics by browsing the web, executing code for analysis, and saving results to files.",
              },
            ],
            resources: [
              {
                label: "LangChain tools documentation",
                type: "Documentation",
                url: "https://python.langchain.com/docs/modules/agents/tools/",
              },
              {
                label: "AutoGPT tool patterns",
                type: "Documentation",
                url: "https://github.com/Significant-Gravitas/AutoGPT",
              },
            ],
          },
          {
            id: "agent-memory",
            title: "Memory & State Management",
            summary: "Short-term memory, long-term memory, vector memory, entity memory, and conversation history.",
            description:
              "Agents need memory. Learn short-term (conversation buffer), long-term (vector database), entity memory (extract and store entities), summary memory, and hybrid memory architectures.",
            level: "Intermediate",
            duration: "2-3 weeks",
            skills: ["Short-Term Memory", "Long-Term Memory", "Vector Memory", "Entity Memory", "Summary Memory"],
            projects: [
              {
                title: "Personal Assistant Agent",
                description: "Build a personal assistant agent with conversation memory, user preference learning, and long-term memory via vector storage.",
              },
            ],
            resources: [
              {
                label: "LangChain memory types",
                type: "Documentation",
                url: "https://python.langchain.com/docs/modules/memory/",
              },
              {
                label: "MemGPT paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2310.08560",
              },
            ],
          },
          {
            id: "agent-frameworks",
            title: "Agent Frameworks",
            summary: "LangChain, LangGraph, AutoGPT, CrewAI, and Semantic Kernel.",
            description:
              "Use established frameworks to build agents faster. Learn LangChain agents and tools, LangGraph for state machines and multi-step workflows, AutoGPT for autonomous task execution, and CrewAI for multi-agent orchestration.",
            level: "Intermediate",
            duration: "3-4 weeks",
            skills: ["LangChain", "LangGraph", "AutoGPT", "CrewAI", "Semantic Kernel"],
            projects: [
              {
                title: "Multi-Step Workflow Agent",
                description: "Build a LangGraph agent that executes multi-step workflows with branching, conditional logic, and human-in-the-loop checkpoints.",
              },
            ],
            resources: [
              {
                label: "LangGraph documentation",
                type: "Documentation",
                url: "https://langchain-ai.github.io/langgraph/",
              },
              {
                label: "CrewAI documentation",
                type: "Documentation",
                url: "https://docs.crewai.com/",
              },
            ],
          },
        ],
      },
      {
        id: "agent-multi-agent",
        index: "03",
        title: "Multi-Agent Systems & Planning",
        description: "Coordinate multiple agents and implement advanced planning.",
        topics: [
          {
            id: "agent-multi-agent",
            title: "Multi-Agent Systems",
            summary: "Agent roles, communication, orchestration, delegation, and consensus mechanisms.",
            description:
              "Multiple agents working together achieve more. Learn agent role design, inter-agent communication, orchestration patterns, task delegation, consensus, voting mechanisms, and conflict resolution.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Agent Roles", "Inter-Agent Communication", "Orchestration", "Task Delegation", "Consensus", "Conflict Resolution"],
            projects: [
              {
                title: "Multi-Agent Debate System",
                description: "Build a system where multiple agents with different roles debate a topic, then reach consensus through voting.",
              },
              {
                title: "Software Engineering Team",
                description: "Build a multi-agent system where a product manager, architect, developer, and QA agent collaborate to build a feature.",
              },
            ],
            resources: [
              {
                label: "AutoGen framework",
                type: "Documentation",
                url: "https://microsoft.github.io/autogen/",
              },
              {
                label: "CrewAI multi-agent",
                type: "Documentation",
                url: "https://docs.crewai.com/core-concepts/Crews/",
              },
            ],
          },
          {
            id: "agent-planning",
            title: "Planning & Reasoning",
            summary: "Hierarchical planning, Monte Carlo Tree Search, reflection loops, and self-improvement.",
            description:
              "Give agents planning capabilities. Learn hierarchical task networks, Monte Carlo Tree Search for decision making, self-reflection loops, self-improvement through feedback, and tree-of-thoughts reasoning.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Hierarchical Planning", "MCTS", "Self-Reflection", "Self-Improvement", "Tree-of-Thoughts"],
            projects: [
              {
                title: "Autonomous Code Developer",
                description: "Build an agent that plans, writes, tests, reflects, and improves code iteratively until all tests pass.",
              },
            ],
            resources: [
              {
                label: "Tree-of-Thoughts paper",
                type: "Documentation",
                url: "https://arxiv.org/abs/2305.10601",
              },
              {
                label: "Voyager paper (agentic learning)",
                type: "Documentation",
                url: "https://arxiv.org/abs/2305.16291",
              },
            ],
          },
        ],
      },
      {
        id: "agent-production",
        index: "04",
        title: "Production Agents & Safety",
        description: "Deploy agents in production with safety, monitoring, and reliability.",
        topics: [
          {
            id: "agent-production-deployment",
            title: "Production Agent Deployment",
            summary: "Agent APIs, state persistence, error handling, rate limiting, and observability.",
            description:
              "Deploy agents reliably. Learn agent API design, state persistence with databases, robust error handling and retries, rate limiting, observability with tracing, and monitoring agent decision quality.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Agent API Design", "State Persistence", "Error Handling", "Rate Limiting", "Observability", "Decision Monitoring"],
            projects: [
              {
                title: "Production Agent Platform",
                description: "Deploy a production agent platform with persistent state, error recovery, human-in-the-loop, and complete observability.",
              },
            ],
            resources: [
              {
                label: "LangSmith tracing",
                type: "Documentation",
                url: "https://docs.smith.langchain.com/",
              },
              {
                label: "Agent deployment patterns",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=ai+agent+production+deployment",
              },
            ],
          },
          {
            id: "agent-safety",
            title: "Agent Safety & Guardrails",
            summary: "Constrained actions, human-in-the-loop, sandboxing, adversarial robustness, and alignment.",
            description:
              "Agents that act in the world need safety measures. Learn constrained action spaces, human-in-the-loop approval workflows, sandboxed execution environments, adversarial robustness, and alignment with user intent.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Constrained Actions", "Human-in-the-Loop", "Sandboxing", "Adversarial Robustness", "Alignment"],
            projects: [
              {
                title: "Safe Agent Framework",
                description: "Build a safety framework for agents with action validation, human approval gates, sandboxed execution, and audit logging.",
              },
            ],
            resources: [
              {
                label: "Anthropic agent safety",
                type: "Documentation",
                url: "https://www.anthropic.com/research",
              },
              {
                label: "NeMo Guardrails for agents",
                type: "Documentation",
                url: "https://github.com/NVIDIA/NeMo-Guardrails",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    roadmapId: "ai-engineering",
    intro:
      "AI Engineering integrates everything — LLMs, RAG, agents, MLOps, and full-stack development — to build production AI systems. This capstone roadmap consolidates all skills into real-world AI products.",
    startTopicId: "ai-engineering-foundations",
    stages: [
      {
        id: "ai-engineering-foundations",
        index: "01",
        title: "AI Engineering Foundations",
        description: "Understand the full AI system stack and development workflow.",
        topics: [
          {
            id: "ai-engineering-full-stack",
            title: "Full-Stack AI Development",
            summary: "AI system architecture, frontend-backend integration, API design, and deployment patterns.",
            description:
              "Build complete AI systems. Learn AI system architecture patterns, integrating AI models with web backends, designing AI-specific APIs, streaming responses, and deploying end-to-end AI applications.",
            level: "Start here",
            duration: "3-4 weeks",
            skills: ["AI System Architecture", "API Design", "Streaming Responses", "Frontend Integration", "Deployment Patterns"],
            projects: [
              {
                title: "Full-Stack AI Chat Application",
                description: "Build a complete AI chat app with FastAPI backend, React frontend, streaming responses, and user authentication.",
              },
            ],
            resources: [
              {
                label: "FastAPI + React integration",
                type: "Documentation",
                url: "https://fastapi.tiangolo.com/advanced/websocket/",
              },
              {
                label: "Vercel AI SDK",
                type: "Documentation",
                url: "https://sdk.vercel.ai/docs",
              },
            ],
          },
          {
            id: "ai-engineering-embeddings",
            title: "Embeddings & Vector Search",
            summary: "Text/image embeddings, vector databases, hybrid search, and multi-modal embeddings.",
            description:
              "Vector search powers modern AI. Learn text and image embeddings, vector databases (Pinecone, Weaviate, Milvus, Chroma), hybrid search combining dense and sparse vectors, and multi-modal embeddings.",
            level: "Foundation",
            duration: "2-3 weeks",
            skills: ["Text Embeddings", "Image Embeddings", "Pinecone", "Weaviate", "Milvus", "Hybrid Search", "Multi-Modal Embeddings"],
            projects: [
              {
                title: "Multi-Modal Search Engine",
                description: "Build a search engine that can find images using text queries and text using image queries using CLIP embeddings and a vector database.",
              },
            ],
            resources: [
              {
                label: "Milvus documentation",
                type: "Documentation",
                url: "https://milvus.io/docs",
              },
              {
                label: "CLIP by OpenAI",
                type: "Documentation",
                url: "https://openai.com/research/clip",
              },
            ],
          },
        ],
      },
      {
        id: "ai-engineering-rag",
        index: "02",
        title: "Advanced RAG & LLMOps",
        description: "Build production-grade RAG systems and manage LLM operations.",
        topics: [
          {
            id: "ai-engineering-advanced-rag",
            title: "Advanced RAG Systems",
            summary: "Multi-hop RAG, agentic RAG, graph RAG, evaluation, and optimization.",
            description:
              "Go beyond simple RAG. Learn multi-hop RAG for complex reasoning, agentic RAG where agents control retrieval, graph RAG for relationship understanding, RAG evaluation metrics, and latency optimization.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["Multi-Hop RAG", "Agentic RAG", "Graph RAG", "RAG Evaluation", "Latency Optimization"],
            projects: [
              {
                title: "Advanced RAG System",
                description: "Build an advanced RAG system with multi-hop retrieval, self-correction, graph-based context, and comprehensive evaluation.",
              },
            ],
            resources: [
              {
                label: "Graph RAG by Microsoft",
                type: "Documentation",
                url: "https://www.microsoft.com/en-us/research/project/graphrag/",
              },
              {
                label: "LlamaIndex advanced RAG",
                type: "Documentation",
                url: "https://docs.llamaindex.ai/en/stable/",
              },
            ],
          },
          {
            id: "ai-engineering-llmops",
            title: "LLMOps & Prompt Management",
            summary: "Prompt versioning, A/B testing, cost optimization, prompt injection defense, and LLM gateways.",
            description:
              "Manage LLMs in production at scale. Learn prompt versioning and management, A/B testing prompts, cost optimization through model routing, prompt injection defense, and LLM gateway patterns.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Prompt Management", "A/B Testing", "Cost Optimization", "Model Routing", "Prompt Injection Defense", "LLM Gateway"],
            projects: [
              {
                title: "LLM Gateway System",
                description: "Build an LLM gateway that handles prompt versioning, model routing, cost tracking, rate limiting, and security checks.",
              },
            ],
            resources: [
              {
                label: "LangSmith prompt management",
                type: "Documentation",
                url: "https://docs.smith.langchain.com/",
              },
              {
                label: "Portkey LLM gateway",
                type: "Documentation",
                url: "https://portkey.ai/docs",
              },
            ],
          },
        ],
      },
      {
        id: "ai-engineering-mlops",
        index: "03",
        title: "MLOps & Model Lifecycle",
        description: "Manage the full ML model lifecycle from training to production.",
        topics: [
          {
            id: "ai-engineering-mlops-pipeline",
            title: "MLOps Pipeline",
            summary: "Experiment tracking, model registry, feature stores, CI/CD for ML, and automated retraining.",
            description:
              "Operationalize ML at scale. Learn experiment tracking with MLflow and Weights & Biases, model registry management, feature stores (Feast), CI/CD pipelines for ML, and automated retraining triggers.",
            level: "Advanced",
            duration: "3-4 weeks",
            skills: ["MLflow", "Weights & Biases", "Model Registry", "Feast Feature Store", "ML CI/CD", "Automated Retraining"],
            projects: [
              {
                title: "End-to-End MLOps Pipeline",
                description: "Build a complete MLOps pipeline with experiment tracking, model registry, automated retraining, and CI/CD for model deployment.",
              },
            ],
            resources: [
              {
                label: "MLflow documentation",
                type: "Documentation",
                url: "https://mlflow.org/docs/latest/",
              },
              {
                label: "Feast feature store",
                type: "Documentation",
                url: "https://docs.feast.dev/",
              },
            ],
          },
          {
            id: "ai-engineering-evaluation",
            title: "AI System Evaluation",
            summary: "Model evaluation, system evaluation, user experience testing, and continuous monitoring.",
            description:
              "Evaluate AI systems holistically. Learn model benchmarking (MMLU, HumanEval, custom eval sets), system-level evaluation (latency, throughput, cost), user experience testing, and continuous monitoring dashboards.",
            level: "Advanced",
            duration: "2-3 weeks",
            skills: ["Model Benchmarking", "System Evaluation", "UX Testing", "Continuous Monitoring", "Evaluation Dashboards"],
            projects: [
              {
                title: "AI Evaluation Platform",
                description: "Build an AI evaluation platform that runs model benchmarks, system performance tests, and continuous monitoring with dashboards.",
              },
            ],
            resources: [
              {
                label: "LangChain evaluation",
                type: "Documentation",
                url: "https://docs.smith.langchain.com/evaluation",
              },
              {
                label: "DeepEval framework",
                type: "Documentation",
                url: "https://docs.confident-ai.com/",
              },
            ],
          },
        ],
      },
      {
        id: "ai-engineering-capstone",
        index: "04",
        title: "Capstone AI Platform",
        description: "Build a complete production AI platform integrating all skills.",
        topics: [
          {
            id: "ai-engineering-capstone-project",
            title: "Production AI Platform Capstone",
            summary: "Full-stack AI system design, implementation, deployment, monitoring, and documentation.",
            description:
              "Bring everything together. Design and build a production AI platform that integrates LLMs, RAG, agents, vector search, MLOps, and full-stack development. This capstone demonstrates all skills from architecture to delivery.",
            level: "Advanced",
            duration: "6-8 weeks",
            skills: ["System Architecture", "Full-Stack Development", "LLM Integration", "RAG Systems", "Agent Orchestration", "MLOps", "DevOps", "Technical Documentation"],
            projects: [
              {
                title: "Enterprise AI Platform",
                description: "Build a complete enterprise AI platform with multi-model support, RAG pipelines, agent orchestration, MLOps, monitoring, and a polished user interface.",
              },
            ],
            resources: [
              {
                label: "AI system design patterns",
                type: "Video",
                url: "https://www.youtube.com/results?search_query=ai+system+design+architecture",
              },
              {
                label: "Production AI case studies",
                type: "Documentation",
                url: "https://github.com/Hannibal046/Awesome-LLM",
              },
            ],
          },
        ],
      },
    ],
  },
];
