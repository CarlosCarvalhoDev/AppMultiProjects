import { EnvironmentAppModel } from '../environment.app.model';
import * as fiveasecProject from '../5asec-project/fiveasec';

export const environment: EnvironmentAppModel = {
  ...fiveasecProject.environment,
  production: true
}
