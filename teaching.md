---
layout: default
title: Teaching
permalink: /teaching/
---

# Teaching

## Current Course

<div class="course-grid">
  {% assign current_courses = site.teaching | where: "semester", "Spring 2025" %}
  {% for course in current_courses %}
    <div class="course-card">
      <h3><a href="{{ course.url | relative_url }}">{{ course.code }}: {{ course.title }}</a></h3>
      <p class="course-semester">{{ course.semester }}</p>
      <p class="course-description">{{ course.description }}</p>
    </div>
  {% endfor %}
</div>

## Previous Courses

<div>
<ul>
<li>[Fall 2024] CSCI 8945: Advanced Representation Learning</li>
<li>[Spring 2024] CSCI 3360: Data Science I</li>
<li><a href="/teaching/Fall2023/Fall2023-CSCI8945.html">Fall 2023: CSCI 8945: Advanced Representation Learning</a></li>
<li><a href="/teaching/Spring2023/Spring2023-NHT.html">Spring 2023: CSCI 8000: New and Hot Topics in Computer Vision and Deep Learning</a></li>
<li>[Fall 2022] CSCI 4900/6900: Computer Vision: The Deep Learning Approach</li>
</ul>
</div>

<!-- <div class="course-grid">
  {% assign previous_courses = site.teaching | where_exp: "course", "course.semester != 'Spring 2025'" %}
  {% for course in previous_courses %}
    <div class="course-card">
      <h3><a href="{{ course.url | relative_url }}">{{ course.code }}: {{ course.title }}</a></h3>
      <p class="course-semester">{{ course.semester }}</p>
      <p class="course-description">{{ course.description }}</p>
    </div>
  {% endfor %}
</div> -->

<!-- <div class="debug-info">
  <h3>Debug Information:</h3>
  <p>Total courses: {{ site.teaching.size }}</p>
  <h4>All courses:</h4>
  <ul>
  {% for course in site.teaching %}
    <li>{{ course.code }} ({{ course.semester }})</li>
  {% endfor %}
  </ul>
</div>  -->