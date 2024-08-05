---
layout: page
permalink: /teaching/
title: teaching
description: 
nav: true
nav_order: 5
---

<div class="teaching">
  {%- assign sorted_teaching = site.teaching | sort: "importance" -%}
  <div class="grid">
    {%- for teaching in sorted_teaching -%}
      {%- if teaching.is_class==true and teaching.active==true -%}
        {% include teaching.html %}
      {%- endif %}
    {%- endfor %}
  </div>
</div>

---

Previous classes:
<div class="teaching">
  {%- assign sorted_teaching = site.teaching | sort: "importance" -%}
  <div class="grid">
    {%- for teaching in sorted_teaching -%}
      {%- if teaching.is_class == true and teaching.active == false -%}
        {% include teaching.html %}
      {%- endif %}
    {%- endfor %}
  </div>
</div>

<div>
    <a href="Fall2023/Fall2023-CSCI8945.html">[Fall 2023] CSCI8945 Advanced Representation Learning</a>
</div>
<div>
    <a href="Spring2023/Spring2023-NHT.html">[Spring 2023] CSCI8000 New and Hot Topics in Computer Vision and Deep Learning</a>
</div>
<div>
    [Fall 2022] CSCI4900/6900 Computer Vision: The Deep Learning Approach
</div>





