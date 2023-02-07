import * as projectIdex from '../idex-project/idex'
import { EnvironmentAppModel } from "../environment.app.model";

export const environment: EnvironmentAppModel = {
  ...projectIdex.environment,
  production: true
};
