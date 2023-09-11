package com.sulleong.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulleong.login.dto.SessionMember;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, SessionMember> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, SessionMember> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // JSON 직렬화 사용
        Jackson2JsonRedisSerializer<SessionMember> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(SessionMember.class);
        ObjectMapper objectMapper = new ObjectMapper().enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(new StringRedisSerializer());

        return template;
    }
}
