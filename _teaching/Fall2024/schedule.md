---
layout: class_schedule
permalink: /teaching/Fall2024/schedule/
title: Fall 2024 • CSCI8945 Advanced Representation Learning • Schedule
is_class: false
---

{% assign current_module = 0 %}
{% assign skip_classes = 0 %}
{% assign prev_date = 0 %}

{% for item in site.data.teaching.schedule_Fall2024 %}
{% if item.date %}
{% assign lecture = item %}
{% assign event_type = "upcoming" %}
{% assign today_date = "now" | date: "%s" | divided_by: 86400 %}
{% assign lecture_date = lecture.date | date: "%s" | divided_by: 86400 %}
{% if today_date > lecture_date %}
    {% assign event_type = "past" %}
{% elsif today_date <= lecture_date and today_date > prev_date %}
    {% assign event_type = "warning" %}
{% endif %}
{% assign prev_date = lecture_date %}

<tr class="{{ event_type }}">
    <th scope="row">{{ lecture.date }}</th>
    {% if lecture.title contains 'No class' %}
    {% assign skip_classes = skip_classes | plus: 1 %}
    <td colspan="2" align="center">{{ lecture.title }}</td>
    {% else %}
    <td>
        {{ lecture.title }}
        <br />
            {% if lecture.slides %}
              [<a href="{{ lecture.slides }}" target="_blank">slides</a>]
            {% endif %}
            {% if lecture.annotated %}
              (<a href="{{ lecture.annotated }}" target="_blank">annotated</a>)
            {% endif %}
            {% if lecture.video %}
              <a href="{{ lecture.video }}" target="_blank">video</a>
            {% endif %}
            {% if lecture.notes %}
            
            {% for note in lecture.notes %}
             [{{ note }}]
            {% endfor %}
            
            <!-- | <a href="{{ lecture.notes }}" target="_blank">notebooks</a> -->
            {% endif %}
    </td>
    <td>
        {% if lecture.readings %}
        References:
        <ul>
        {% for reading in lecture.readings %}
            <li>{{ reading }}</li>
        {% endfor %}
        </ul>
        {% endif %}
    </td>
    {% endif %}
</tr>
{% else %}
{% assign current_module = current_module | plus: 1 %}
{% assign module = item %}
<tr class="info">
    <td colspan="3" align="center"><strong>{{ module.title }}</strong></td>
</tr>
{% endif %}
{% endfor %}