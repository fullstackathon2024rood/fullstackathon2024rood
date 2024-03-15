package adapters.hello

import adapters.Localizer
import io.javalin.Javalin
import io.javalin.http.Context
import java.util.*

object HelloPage {

    fun addRoutes(app: Javalin) {
        // Initial page
        app.get("/") { ctx -> firstLoad(ctx) }

        // Page actions
        app.post("/clicked") { ctx -> clicked(ctx) }
    }
    private fun firstLoad(ctx: Context) {
        val page = HelloPageData()
        page.userName = "<script>alert('xss')</script>"
        page.userKarma = 1337
        ctx.render("hello.jte", mapOf("pageData" to page, "localizer" to Localizer(Locale.US)))
    }
    private fun clicked(ctx: Context) {
        ctx.render("fragments/clicked.jte")
    }
}

class HelloPageData {
    @JvmField var userName: String? = null
    @JvmField var userKarma = 0
}