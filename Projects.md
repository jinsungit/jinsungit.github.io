---
layout: default
title: Projects
permalink: /projects/
---

# Research Topics

My research spans across computer vision, deep learning, multi-modal learning, and AI for science, health, and society.

<div class="project-sections">
  <div class="project-category">
    <h2>Computer Vision</h2>
    <div class="project-description">
    Image relighting, image synthesis, 3D reconstruction, scene understanding, human analysis, object detection, context modeling.
    </div>
    <details class="project-group">
      <summary class="project-summary">
        <span>View Publications</span>
      </summary>
      <div class="publications">
        {% bibliography --query @*[tags~=CV] %}
      </div>
    </details>
  </div>
  <div class="project-category">
    <h2>Multi-Modal Learning</h2>
    <div class="project-description">
    Cross-modal retrieval and generation, multi-modal representation learning, VLMs and LLMs.
    </div>
    <details class="project-group">
      <summary class="project-summary">
        <span>View Publications</span>
      </summary>
      <div class="publications">
        {% bibliography --query @*[tags~=MM] %}
      </div>
    </details>
  </div>
  <div class="project-category">
    <h2>AI for Science, Health, and Society</h2>
    <div class="project-description">
    </div>
    <details class="project-group">
      <summary class="project-summary">
        <span>View Publications</span>
      </summary>
      <div class="publications">
        {% bibliography --query @*[tags~=AI4Science] %}
      </div>
    </details>
  </div>
</div> 