# Modular Website

![router2](http://25.media.tumblr.com/2e300fd39f1f99087292b8f58ee39062/tumblr_mia72sqn9w1r3gb3zo1_400.gif)

## TLDR
Cutting big website into small pieces is really nice.

## What
We always try to modularize our code - break down a big function to smaller ones or chunk a feature to it's use-cases.
What about the application level? what if we could take a big website and break it into multiple website?  

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
|                 |         |                | router: Node.js app or Nginx
|                 | router  |                | home/profile/auth: Node.js website
|                 |         |                |
|                 +---------+                |
|               /  port 3000  \              |
|              /       |       \             |
|   +---------+   +---------+  +---------+   |
|   |         |   |         |  |         |   |
|   |  home   |   | profile |  |  auth   |   |
|   |         |   |         |  |         |   |
|   +---------+   +---------+  +---------+   |
|    port 3001     port 3002    port 3003    |
+--------------------------------------------+
              Production host 1
```

The router can be a simple Node app or a reverse proxy such as Nginx. In this example our router will be a Node app, More specificaly we use the [http-proxy](https://github.com/nodejitsu/node-http-proxy) package written by Nodejitsu.
For the sake of simplicity (deployment and management) the router and the websites will live on the same host, each on it's own process, but it's possible to put each app on a different host.

So how does the router work? it pass each request to the right website based on the request url.
In our example I want to send '/' and '/api' to the home app, '/profile' to the profile app, etc.

## Why

* Maintenance - easier to add feature/fix bug when working on smaller codebase.
* Flexible - each project might require different architecture/framework.
* Velocity - since each project can be deployed separately, new features or bug fixes hit production faster.
* Team structure - clear boundaries between features can lead to more focused teams.
* Scaling - sub-app that receives more traffic is scaled horizontally by adding more instances.
* Innovation - big codebase makes it hard to experiment with new tools/technologies.

## Deployment

We have mainly 2 options:

1. [Blue-green deployment](http://martinfowler.com/bliki/BlueGreenDeployment.html) - setup new hosts, deploy new code and point the load-balancer to those hosts.
1. Rolling deployment - Disconnect host-1 from load balancer, deploy app(s), reconnect host-1 and repeat with all hosts.

## Performance

http-proxy adds around 20ms to each request. 

## Try it

1. git clone git@github.com:oren/multi-sites.git
1. cd router && npm install && node server
1. cd home && node server
1. cd profile && node server
1. cd auth && node server

Go to localhost:3000, localhost:3000/login and localhost:3000/profile

Each of those url are being served from different app - the first uses the home app, the second uses profile and the third uses the auth app.

## Other examples

Groupon recently switched from Rails to node and they divided their site into 20 small websites - https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/
