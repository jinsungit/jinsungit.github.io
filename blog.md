---
layout: default
title: Blog
permalink: /blog/
---

# Blog Posts

{% for post in site.posts %}
  <article>
    <h2>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </h2>
    <time datetime="{{ post.date | date: "%Y-%m-%d" }}">
      {{ post.date | date: "%B %d, %Y" }}
    </time>
    {% if post.description %}
      <p>{{ post.description }}</p>
    {% endif %}
  </article>
{% endfor %} 