import jss from 'jss';
import jssCamelCase from 'jss-plugin-camel-case';
import jssPluginNested from 'jss-plugin-nested';

jss.use(jssCamelCase());
jss.use(jssPluginNested());

export { jss };
