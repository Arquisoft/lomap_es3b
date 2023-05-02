
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class PruebaCarga1 extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://res.cloudinary.com")
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0")
  
  private val headers_0 = Map(
  		"Cache-Control" -> "no-cache",
  		"Content-Type" -> "application/ocsp-request",
  		"Pragma" -> "no-cache"
  )
  
  private val headers_6 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"DNT" -> "1"
  )
  
  private val uri1 = "http://ocsp.godaddy.com"
  
  private val uri2 = "http://r3.o.lencr.org"
  
  private val uri3 = "http://ocsp.pki.goog/gts1c3"

  private val scn = scenario("PruebaCarga1")
    .exec(
      http("request_0")
        .post(uri2 + "/")
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0000_request.dat"))
    )
    .pause(1)
    .exec(
      http("request_1")
        .post(uri2 + "/")
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0001_request.dat"))
    )
    .pause(21)
    .exec(
      http("request_2")
        .post(uri3)
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0002_request.dat"))
        .resources(
          http("request_3")
            .post(uri3)
            .headers(headers_0)
            .body(RawFileBody("pruebacarga1/0003_request.dat")),
          http("request_4")
            .post(uri3)
            .headers(headers_0)
            .body(RawFileBody("pruebacarga1/0004_request.dat"))
        )
    )
    .pause(39)
    .exec(
      http("request_5")
        .post(uri1 + "/")
        .headers(headers_0)
        .body(RawFileBody("pruebacarga1/0005_request.dat"))
    )
    .pause(10)
    .exec(
      http("request_6")
        .get("/demo/image/upload/v1683052885/docs_uploading_example/Captura_de_pantalla_20230226_203413_ikpzve.png")
        .headers(headers_6)
    )
    .pause(61)
    .exec(
      http("request_7")
        .get("/demo/image/upload/v1683052950/docs_uploading_example/Captura_de_pantalla_20230223_110100_c9uwhn.png")
        .headers(headers_6)
    )
    .pause(36)
    .exec(
      http("request_8")
        .get("/demo/image/upload/v1682503262/docs_uploading_example/mayo_mcgoar.png")
        .headers(headers_6)
    )

		setUp(
  scn.inject(
    nothingFor(4), // 1
    constantUsersPerSec(50).during(60), // 4
    stressPeakUsers(500).during(30) // 8
  ).protocols(httpProtocol)
)
}

