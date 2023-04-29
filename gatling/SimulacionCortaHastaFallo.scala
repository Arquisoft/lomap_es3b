
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class SimulacionCortaHastaFallo extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://r3.o.lencr.org")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .contentTypeHeader("application/ocsp-request")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Cache-Control" -> "no-cache",
  		"Pragma" -> "no-cache"
  )


  private val scn = scenario("SimulacionCortaHastaFallo")
    .exec(
      http("request_0")
        .post("/")
        .headers(headers_0)
        .body(RawFileBody("simulacioncortahastafallo/0000_request.dat"))
    )

	setUp(
  scn.inject(
    nothingFor(4), // 1
    atOnceUsers(10), // 2
    constantUsersPerSec(20).during(5.minutes), // 4
    stressPeakUsers(1000).during(20) // 8
  ).protocols(httpProtocol)
)
}
