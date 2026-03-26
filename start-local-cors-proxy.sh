#!/bin/bash

npx local-cors-proxy --proxyUrl https://api.track.toggl.com --port 8010 &
live-server &