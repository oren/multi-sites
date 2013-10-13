# Modular Website

## TLDR
Splitting a big website into small websites is really nice.

## What
We always try to modularize our code - break down a big function to smaller ones or chunk a feature to it's use-cases.
What about the application level? what if we could take a big website and break it into multiple website?  

Before we continue I want to make sure we are talking about a website and not a web application. My definition of a website is a site that most of the rendering is done on the server.
I say most since some elements of the site might use AJAX and client-side rendering. If on the other hand your site is mainly a single-page-app, and you are doing most of the rendering and logic on the client, this idea of multiple websites doesn't apply to you.

In our example we have a website with the following sections: Home, Profile and Authentication (login/logout/registration etc).
We are going to split it into small websites, each one is autonomous - it has a git repo with dependencies, and it can be deployed by itself.
The dependencies for each site will be NPM packages and some of them will be shared with other sites (tracking, css, utilities).

## How

```bash

                  +---------+
                  |         | Load Balancing
                  |  Nginx  |
                  |         | SSL Termination
                  +---------+
                       +
                       |
                       v
+--------------------------------------------+
|                                            |
|                 +---------+                |
|                 |         |                | router: node.js app or Nginx
|                 | router  |                | home/profile/auth: node.js website
|                 |         |                | 
|                 +---------+                | 
|               /      |      \              |
|              /       |       \             |
|   +---------+   +---------+  +---------+   |
|   |         |   |         |  |         |   |
|   |   home  |   | profile |  |  auth   |   |
|   |         |   |         |  |         |   |
|   +---------+   +---------+  +---------+   |
|                                            |
+--------------------------------------------+
              Production host 1
```

We will use the [http-proxy](https://github.com/nodejitsu/node-http-proxy) package written by Nodejitsu. Our router will run on it's own process.
For the sake of simplicity (deployment/monitoring), the router and the websites can live on the same host, each on it's own process.
The only caveat is you are limited by the number of cores. on 8-core machines you can have maximum of 7 separate websites + router.
If at some point you decide to use commodity hardware with less cores, you can put each website on it's own host.

So how does the router work? it pass each request to the right website based on the request url.
In our example I want to send '/' and '/api' to the home website, '/profile' to the profile, etc.

And here is router/config.json:
```json
{
  "home": { "host": "0.0.0.0", "port": 3001 },
  "profile": { "host": "0.0.0.0", "port": 3002 },
  "auth": { "host": "0.0.0.0", "port": 3003 }
}
```

You can see that each site listen on a different port.

## Why

* Maintenance - easier to add feature/fix bug when working on smaller codebase.
* Flexible - each project might require different architecture/framework.
* Velocity - since each project can be deployed separately, new features or bug fixes hit production faster.
* Team structure - clear boundaries between features can lead to more focused teams.
* Innovation - big codebase makes it hard to experiment with new tools/technologies.

## Try it

1. git clone git@github.com:oren/multi-sites.git
1. cd router && npm install && node server
1. cd home && node server
1. cd profile && node server
1. cd auth && node server
1. hit 0.0.0.0:3000 (the router)
1. hit 0.0.0.0:3000/login
1. hit 0.0.0.0:3000/profile

Each of those url are using different website. The first uses home, on port 3001, the second uses profile on port 3002 and the third uses auth, on port 3003.
