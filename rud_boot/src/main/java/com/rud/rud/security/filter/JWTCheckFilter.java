package com.rud.rud.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.rud.rud.dto.MemberDTO;
import com.rud.rud.util.JWTUtil;

import com.google.gson.Gson;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {
    // 특정 경로에 대한 요청은 필터링x
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Preflight요청은 체크하지 않음
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }

        String path = request.getRequestURI();
        log.info("check uri.............." + path);

        // api/member/ 경로의 호출은 체크하지 않음
        if (path.startsWith("/superant/login") || path.startsWith("/superant/signup")) {
            return true;
        }

        return false;
    }

    // authorization 헤더에서 jwt를 추출하고 검증
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("------------------------JWTCheckFilter.......................");

        String authHeaderStr = request.getHeader("Authorization");

        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
            log.error("Authorization header is missing or invalid");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is missing or invalid");
            return;
        }

        try {
            //Bearer accestoken...
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);

            log.info("JWT claims: " + claims);

            //filterChain.doFilter(request, response); //이하 추가
            String userId = (String) claims.get("userId");
            String password = (String) claims.get("password");
            String email = (String) claims.get("email");
            String name = (String) claims.get("name");
            String phoneNumber = (String) claims.get("phoneNumber");
            Boolean personalInfoConsent = (Boolean) claims.get("personalInfoConsent");
            Boolean dataAnalysisConsent = (Boolean) claims.get("dataAnalysisConsent");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            MemberDTO memberDTO = new MemberDTO(userId, password, name, email, phoneNumber, personalInfoConsent.booleanValue(), dataAnalysisConsent.booleanValue(),roleNames);

            log.info("-----------------------------------");
            log.info(memberDTO);
            log.info(memberDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, password, memberDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        }catch(Exception e){

            log.error("JWT Check Error..............");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }
}
