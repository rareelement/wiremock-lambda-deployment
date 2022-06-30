import { CfnOutput, Duration, Stack, StackProps, } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Architecture, Code, DockerImageCode, DockerImageFunction, } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new DockerImageFunction(this, 'WiremockLambda', {
      architecture: Architecture.X86_64,
      memorySize: 2048,
      timeout: Duration.seconds(30),
      logRetention: RetentionDays.ONE_WEEK,
      code: DockerImageCode.fromImageAsset('../lambda/'),
    });

    const restApi = new RestApi(this, 'WiremockLambdaRestAPI',);

    restApi.root.addProxy({
      defaultIntegration: new LambdaIntegration(lambda),
      anyMethod: true,
      defaultMethodOptions: {
        requestParameters: { 'method.request.path.proxy': true },
      },
    })

  }
}
