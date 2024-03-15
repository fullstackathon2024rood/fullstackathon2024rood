import adapters.hello.HelloPage
import gg.jte.ContentType
import gg.jte.TemplateEngine
import gg.jte.resolve.DirectoryCodeResolver
import io.javalin.Javalin
import io.javalin.http.staticfiles.Location
import io.javalin.rendering.template.JavalinJte
import java.nio.file.Path


fun main() {
    JavalinJte.init(createTemplateEngine())

    // Add pages & actions to Javalin
    val app = Javalin.create()
    HelloPage.addRoutes(app)
    app.start(7070)

    // Enable Webjars, needed for HTMX
    app.cfg.staticFiles.enableWebjars()

    // Add CSS
    app.cfg.staticFiles.add("static", Location.CLASSPATH)
}

private fun createTemplateEngine(): TemplateEngine {
    val codeResolver = DirectoryCodeResolver(Path.of("src", "main", "jte"))
    return TemplateEngine.create(codeResolver, ContentType.Html)
}