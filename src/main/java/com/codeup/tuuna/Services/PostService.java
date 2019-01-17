package com.codeup.tuuna.Services;

import com.codeup.tuuna.Models.Post;
import com.codeup.tuuna.Repositories.PostRepository;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postDao;

    public PostService(PostRepository postDao) {
        this.postDao = postDao;
    }

    public List<Post> findAll() {
        return (List<Post>) postDao.findAll();
    }

    public Post findOne(long id){
        return postDao.findOne(id);
    }

    public Post findFirstByOrderByIdDesc() {
        return postDao.findFirstByOrderByIdDesc();
    }

    public void save(Post post) {
        postDao.save(post);
    }

    public void delete(Post post) {
        postDao.delete(post);
    }

    public void deleteByID(long id) {
        postDao.delete(id);
    }
}
