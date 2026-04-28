package com.scrapninja.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class RequestLoggingFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    private static final String ANSI_RESET  = "\u001B[0m";
    private static final String ANSI_CYAN   = "\u001B[36m";
    private static final String ANSI_YELLOW = "\u001B[33m";
    private static final String ANSI_GREEN  = "\u001B[32m";
    private static final String ANSI_RED    = "\u001B[31m";
    private static final String ANSI_BLUE   = "\u001B[34m";
    private static final String ANSI_WHITE  = "\u001B[37;1m";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTime = System.currentTimeMillis();

        ServerHttpRequest request = exchange.getRequest();
        String method = request.getMethod().name();
        String path = request.getURI().getPath();
        String query = request.getURI().getQuery();
        String fullPath = query != null ? path + "?" + query : path;

        Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        String serviceId = route != null ? route.getId() : "unknown";
        String serviceUri = route != null ? route.getUri().toString() : "unknown";

        System.out.println();
        System.out.println(ANSI_CYAN + "" + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_WHITE + "  >> INCOMING REQUEST" + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Service : " + ANSI_WHITE + serviceId + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Target  : " + ANSI_GREEN + serviceUri + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Method  : " + ANSI_BLUE + method + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  API     : " + ANSI_GREEN + fullPath + ANSI_RESET);
        System.out.println(ANSI_CYAN + "" + ANSI_RESET);

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long duration = System.currentTimeMillis() - startTime;
            ServerHttpResponse response = exchange.getResponse();
            int statusCode = response.getStatusCode() != null ? response.getStatusCode().value() : 0;
            String statusColor = statusCode >= 200 && statusCode < 300 ? ANSI_GREEN :
                                 statusCode >= 400 && statusCode < 500 ? ANSI_YELLOW : ANSI_RED;

            System.out.println();
            System.out.println(ANSI_CYAN + "" + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_WHITE + "  << RESPONSE" + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Service : " + ANSI_WHITE + serviceId + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  API     : " + ANSI_GREEN + method + " " + fullPath + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Status  : " + statusColor + statusCode + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_YELLOW + "  Time    : " + ANSI_WHITE + duration + "ms" + ANSI_RESET);
            System.out.println(ANSI_CYAN + "" + ANSI_RESET);
        }));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}