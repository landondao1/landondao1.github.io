export const concepts = [
    {
        title: "CI/CD Pipelines", 
        tags: ["github", "jenkins", "codebuild"],
        description: "Jenkins:\nUpon github pull request, I configured a Jenkins file to do things like validate json configuration files, compile code and run test cases. Depending on the result, it pushed an ok or error back to github which either allowed or denied merges. Upon github pushes, I configured a Jenkinsfile to check for version bumps and deploy the new code to servers.\n\nAWS Codebuild:\nUpon github pushes, I configured a buildspec file to run test cases in prebuild. If the test cases failed, then the codebuild project fails to push the changes. If it passed the test cases, then the steps built the project and deployed it using cloudformation.",
    },
    {
        title: "Serverless", 
        tags: ["api-gateway", "sqs", "lambda", "s3"],
        description: "I really like serverless technologies because it keeps cost low and allows highly scalable applications/computing. Below are two serverless stacks that I've personally used.\n\nEvent Processing:\n It used an api gateway in ingest events and inserted them into an sqs queue. This allowed the platform to process the events on it's own time. I also didn't want to overload connecting applications with floods of requests, so the sqs queues had a certain number of concurrent lambdas it could trigger.\n\nWeb Application:\nIt used an api gateway to route web requests which called lambads that served pages from s3. To pull dynamic data, the front-end fetched data from other api gateway endpoints on the fly. \n\nOne issue I faced was cold lambda starts. When no lambdas were running and a new request came in, the very first request took 10 to 30 seconds to load.",
    },
    {
        title: "Infrastructure as Code", 
        tags: ["terraform", "chef", "ansible"],
        description: "Terraform:\nI've used terraform to build out an entire aws vpc. It was needed to clone my serverless event processing platform into a different vpc. It also maintained the state of the resources and allowed multiple engineers to make changes to resource attributes without ever having to go into the aws console.\n\nChef:\nI've created many chef cookbooks to build out different types of servers. I've also created smaller recipes and included them into run lists to be more modular. I often use chef in tandem with terraform to create the vpc ec2 resources and bootstrap them with chef.\n\nAnsible:\nI've used ansible to deploy monitoring agents to thousands of servers via ssh and winrm. I love the wide range of modules this tool has, but my only issue is it's scalability. I've used ansible tower to run the playbooks, but it queued jobs up and ran them one by one which meant my playbooks only ran after the queue cleared.",
    },
    {
        title: "Supervised Machine Learning", 
        tags: ["sagemaker", "python"],
        description: "Decision Tree:\nI created a sagemaker endpoint that predicted a value given a set of features. The endpoint returned a list of predictions with their confidence intervals. To keep the endpont up-to-date with the newest labeled data, I created a script to train and deploy a new model daily. It was used to accurately determine root causes of outages and possible fixes for it.",
    },
];
export default concepts;