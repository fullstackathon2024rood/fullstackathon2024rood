package adapters

import gg.jte.support.LocalizationSupport
import java.util.*

class Localizer(locale: Locale): LocalizationSupport {
    private val bundle: ResourceBundle = ResourceBundle.getBundle("localization", locale)

    override fun lookup(key: String): String {
        return bundle.getString(key)
    }
}