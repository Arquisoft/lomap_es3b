
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class SimulacionLargaHastaFallo extends Simulation {

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
  
  private val headers_2 = Map(
  		"Accept" -> "image/avif,image/webp,*/*",
  		"DNT" -> "1"
  )
  
  private val uri1 = "http://ocsp.godaddy.com"

  private val scn = scenario("SimulacionLargaHastaFallo")
    .exec(
      http("request_0")
        .post(uri1 + "/")
        .headers(headers_0)
        .body(RawFileBody("simulacionlargahastafallo/0000_request.dat"))
        .resources(
          http("request_1")
            .post(uri1 + "/")
            .headers(headers_0)
            .body(RawFileBody("simulacionlargahastafallo/0001_request.dat"))
        )
    )
    .pause(9)
    .exec(
      http("request_2")
        .get("/demo/image/upload/v1682783444/docs_uploading_example/mayo_jh6npg.png")
        .headers(headers_2)
    )
    .pause(37)
    .exec(
      http("request_3")
        .get("/demo/image/upload/v1682503262/docs_uploading_example/mayo_mcgoar.png")
        .headers(headers_2)
    )

setUp(
  scn.inject(
    nothingFor(4), // 1
    constantUsersPerSec(100).during(100), // 4
    stressPeakUsers(1000).during(30) // 8
  ).protocols(httpProtocol)
)}
