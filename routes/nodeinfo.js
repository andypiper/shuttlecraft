// implementation of http://nodeinfo.diaspora.software/protocol.html

import express from "express";

export const router = express.Router();

// TODO get these from package.json?
let instanceType = 'shuttlecraft'; 
let instanceVersion = '0.0.1';


router.get("/", async function (req, res) {
  let domain = req.app.get("domain");

  if (req.originalUrl == "/.well-known/nodeinfo") {
    let thisNode = {
      links: [
        {
          rel: "http://nodeinfo.diaspora.software/ns/schema/2.0",
          href: `https://${domain}/nodeinfo/2.0`,
        },
      ],
    };
    res.json(thisNode);
  }

  if (req.originalUrl == "/nodeinfo/2.0") {

    // TODO: activeMonth and activeHalfyear should be dynamic, currently static
    // TODO: actually count number of local posts
    let nodeInfo = {
      version: 2.0,
      software: {
        name: instanceType,
        version: instanceVersion,
      },
      protocols: [
        "activitypub"
      ],
      services: {
        outbound: ["rss2.0"],
        inbound: []
      },
      usage: {
        users: {
          total: 1,
          activeMonth: 1,
          activeHalfyear: 1
        },
        localPosts: 1,
      },
      openRegistrations: false,
      metadata: {}
    };

    // spec requires setting this, majority of implementations
    // appear to not bother with it?
    res.type('application/json; profile="http://nodeinfo.diaspora.software/ns/schema/2.0#"')

    res.json(nodeInfo);

  }
});
