---
layout: default
title: How to Generate Docs Locally
parent: Contributing to Our Docs
grand_parent: Operations
has_children: false
---

# How to Generate Docs Locally
Jekyll provides us with the ability to run a local server which mimics how our documentation looks after being built with GitHub pages.Generating the documentation locally helps to ensure that the documentation that you write is properly formatted and styled. This documentation will provide an overview of building the documentation.

## Pre-requisites
A few pre-requisites are required before generating the documentation:
- ruby 3.0.0 - you should use a tool like rvm or rbenv to switch ruby versions
- bundler 2.1.2 - this can be installed by running `gem install bundler:2.1.2`

## Building the Docs
If you'd like to check if the docs are properly building, run `bundle exec jekyll build`. You can skip this step entirely if you're planning on running a local server, which will also build the docs.

You'll likely see a warning like this:
```
GitHub Metadata: No GitHub API authentication could be found. Some fields may be missing or have incorrect data.
```
Don't fear, the docs site will just be missing a few features, such as a list of contributors. This doesn't have a major impact.


## Serving the Docs
If you'd like to run a local server to view the docs, run `bundle exec jekyll serve`. This will start a jekyll server on localhost:4000 by default. If you already have something running on port 4000, you can specify the port by adding the `--port` option, like this: `bundle exec jekyll serve --port 54321`. To automatically reload the server when files are changed, run `bundle exec jekyll serve --livereload`. You may encounter some issues with this if you're running on windows.

## Serving the Docs as a docker container
If you do not want to install the dependencies in your local system, or you run into an error while installing them, you can also use the provided dockerfile to build the image and run it as a container. This container is exposed in port 4000, and would do a hot reloading in case you update the files on the ``/docs`` folder. Hot reload is not instant, it takes about 10-15 seconds for jekyll to re-build the docs and serve an updated version.
All commands listed below should be run from the root of the `devsecops-docs` repository.
 1. Building the image:
        ```
        docker build ./scripts -t jekyll-serve-mc-docs
        ```

 2. Running the container: 
        ```
          docker run -p 4000:4000 -v $(pwd)/docs:/site jekyll-serve-mc-docs
        ```

Upon succesful completion of step 2, container should be serving the docs on port 4000. See also logs from the shell for more info.