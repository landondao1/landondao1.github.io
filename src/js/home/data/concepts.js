export const concepts = [
    {
        title: "CI/CD: Jenkins", 
        tags: ["jenkins", "github"],
        description: "Upon github pull request, I configured a Jenkins file to do things like validate json configuration files, compile code and run test cases. Depending on the result, it pushed an ok or error back to github which either allowed or denied merges. Upon github pushes, I configured a Jenkinsfile to check for version bumps and deploy the new code to servers.",
    },
    {
        title: "CI/CD: AWS Codebuild", 
        tags: ["codebuild", "github"],
        description: "Upon github pushes, I configured a buildspec file to run test cases in prebuild. If the test cases failed, then the codebuild project fails to push the changes. If it passed the test cases, then the steps built the project and deployed it using cloudformation.",
    },
    {
        title: "Serverless: Event Processing", 
        tags: ["api-gateway", "sqs", "lambda"],
        description: "I created a highly scalable and low cost event processing platform. It used an api gateway in ingest events and inserted them into an sqs queue. This allowed the platform to process the events on it's own time. I also didn't want to overload connecting applications with floods of requests, so the sqs queues had a certain number of concurrent lambdas it could trigger.",
    },
    {
        title: "Serverless: Web Application", 
        tags: ["api-gateway", "lambda", "s3"],
        description: "I created a highly scalable and low cost web applications. It used an api gateway to route web requests which called lambads that served pages from s3. To pull dynamic data, the front-end fetched data from other api gateway endpoints on the fly. \n\nOne issue I faced was cold lambda starts. When the very first person access the web application in the mornings, the first request took 10 to 30 seconds to load.",
    },
    {
        title: "IaC: Ansible", 
        tags: ["ansible"],
        description: "I've used this tool to deploy monitoring agents to thousands of servers via ssh and winrm. I love the wide range of modules this tool has, but my only issue is it's scalability. I've used ansible tower to run the playbooks, but it queued jobs up and ran them one by one which meant my playbooks only ran after the queue cleared.",
    },
    {
        title: "IaC: Chef", 
        tags: ["chef"],
        description: "I've created many chef cookbooks to build out different types of servers. I've also created smaller recipes and included them into run lists to be more modular. I often use chef in tandem with terraform to create the vpc ec2 resources and bootstrap them with chef.",
    },
    {
        title: "IaC: Terraform", 
        tags: ["terraform"],
        description: "I've used terraform to build out an entire aws vpc. It was needed to clone my serverless event processing platform into a different vpc. It also maintained the state of the resources and allowed multiple engineers to make changes to resource attributes without ever having to go into the aws console.",
    },
];
export default concepts;