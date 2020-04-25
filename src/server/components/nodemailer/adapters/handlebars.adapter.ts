/** Dependencies * */
import fs from "fs";
import handlebars from "handlebars";
import inlineCss from "inline-css";
import path from "path";

export class HandlebarsAdapter {
  private precompiledTemplates: {
    [name: string]: handlebars.TemplateDelegate;
  } = {};

  public constructor(private readonly options: CompileOptions & { dir: string }) {}

  public compile(mail: any, callback: any): void {
    const precompile = (template: any, cb: any) => {
      const templateExt = path.extname(template) || ".hbs";
      const templateName = path.basename(template, path.extname(template));
      const templateDir = path.dirname(template) !== "." ? path.dirname(template) : this.options.dir;
      const templatePath = path.join(templateDir, templateName + templateExt);

      if (!this.precompiledTemplates[templateName]) {
        try {
          const templ = fs.readFileSync(templatePath, "UTF-8");

          this.precompiledTemplates[templateName] = handlebars.compile(templ, this.options);
        } catch (err) {
          return cb(err);
        }
      }

      return {
        templateExt,
        templateName,
        templateDir,
        templatePath
      };
    };

    const { templateName } = precompile(mail.data.template, callback);

    const rendered = this.precompiledTemplates[templateName](mail.data.context);

    inlineCss(rendered, { url: " " }).then((html: string) => {
      mail.data.html = html;
      return callback();
    });
  }
}
