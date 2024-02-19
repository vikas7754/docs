---
layout: default
title: "How to Write and Post Documentation to our GitHub Pages"
parent: Contributing to Our Docs
grand_parent: Operations
nav_order: 10
has_children: true
---

# How to Write and Post Documentation to our GitHub Pages

### **_In order to create, write and publish documentation for our GitHub Pages, the following items are required_**:

#1 - Clone the DevOps Docs Repo (<https://github.tools.sap/mce/devsecops-docs>).

#2 - Run the Doc Helper Script (found in the DevOps Docs Repo, in the scripts folder), which will create the markdown file for you. Run the script from/in the root directory of the cloned DevOps Docs Repo. For those using Mac computers/laptops, you can open your Terminal, cd to the root directory of the cloned DevOps Docs Repo and run bash (whatever the path of the Doc Helper script). For those using PCs, you can cd to the root directory of the cloned DevOps Docs Repo and run the script using WSL, Cgywin, Git for Windows, etc.

#3 - Write your documentation in the markdown file created by the Doc Helper Script, using markdown, but you can use HTML elements, images and styling elements: <https://pmarsceill.github.io/just-the-docs/docs/ui-components>.

#4 - All images should be referenced like this:

```
![the actual image file name without the file extension](/assets/docs-images/<path to specific doc images folder>)
```

#5 - Move any image that you use in the documentation into the doc images folder that the Doc Helper Script created. The folder should be named after the title of your documentation and will be found using this path: /devsecops-docs/docs/assets/docs-images.

- #5a - If you'd like to include videos in your documentation, please upload them to <https://web.microsoftstream.com/group/af278c11-5c40-4d7c-ae05-cea95b348a83>. Click on the Upload a Video button or Click on the Upload Video link. Once the video is completely processed, click on the Publish button. Then click on Share > Embed. Choose the options you'd like to use for your video (Video Size, Autoplay, Responsive, etc.) and you'll see the code for your video below those options. Copy and paste it into your documentation markdown file.

#6 - Please use one of the categories/folders from the Github Pages site: </>. Your documentation should fall under one of the listed categories/folders on the left side of the page. If not, please fill out this form and we will get back to you on whether or not a new category is needed (as soon as possible): <https://1hlg3qldh6z.typeform.com/to/hNiVgBHN>. If you're requesting a new category, please don't push your documentation to Github until the Github Pages Quality Board gets back to you with a response.

#7 - Push the document and images, once done, to the mce/devsecops-docs repo. Then open a PR to get the documentation reviewed. Once it's been fully reviewed and approved, merge the PR and it should be published to the Github Pages site almost instantaneously.

#8 - Spellcheck and proofread your documentation for any spelling, grammar and punctuation errors.

#9 - Any questions you have regarding documentation creation, Github pages, blog creation, etc., can be asked in the #hs_devsecops_docs slack channel.
