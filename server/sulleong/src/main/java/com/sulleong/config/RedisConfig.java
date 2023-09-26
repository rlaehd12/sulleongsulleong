package com.sulleong.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sulleong.login.dto.AuthMember;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, AuthMember> authMemberTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, AuthMember> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // JSON 직렬화 사용
        Jackson2JsonRedisSerializer<AuthMember> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(AuthMember.class);
        ObjectMapper objectMapper = new ObjectMapper().enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(new StringRedisSerializer());

        template.setDefaultSerializer(jackson2JsonRedisSerializer);

        return template;
    }

    @Bean
    public RedisTemplate<Long, Integer> totalPreferenceTemplate(RedisConnectionFactory factory) {
        RedisTemplate<Long, Integer> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        // JSON 직렬화 사용
        Jackson2JsonRedisSerializer<Integer> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Integer.class);
        ObjectMapper objectMapper = new ObjectMapper().enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);

        GenericToStringSerializer<Long> longToStringSerializer = new GenericToStringSerializer<>(Long.class);

        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setKeySerializer(longToStringSerializer);

        return template;
    }
}
