
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PruebaCarga1 extends Simulation {

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
  
  private val uri1 = "http://ocsp.godaddy.com"

  private val scn = scenario("PruebaCarga1")
    .exec(
      http("request_0")
        .post("/")
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0000_request.dat"))
        .resources(
          http("request_1")
            .post("/")
            .headers(headers_0)
            .body(RawFileBody("pruebacarga1/0001_request.dat"))
        )
    )
    .pause(66)
    .exec(
      http("request_2")
        .post(uri1 + "/")
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0002_request.dat"))
    )

	setUp(
  	scn.inject(
   	nothingFor(4), // 1
    	atOnceUsers(100), // 2
    rampUsers(50).during(5), // 3
    constantUsersPerSec(100).during(15), // 4
    stressPeakUsers(1000).during(20) // 8
  ).protocols(httpProtocol)
)

}
