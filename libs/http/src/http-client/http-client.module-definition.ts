import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HttpOptions } from './http-client.service';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<HttpOptions>().build();
