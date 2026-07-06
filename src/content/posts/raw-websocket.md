---
title: "Brief About How the Protocol Switch Happens in WebSocket"
date: "Jul 6, 2026"
slug: "brief-about-how-the-protocol-switch-happens-in-websocket"
---

# Brief About How the Protocol Switch Happens in WebSocket

If you've ever used WebSocket through libraries like `ws` or `Socket.IO`, you probably know that it enables real-time communication. But have you ever wondered what actually happens under the hood when a WebSocket connection is established?

Most explanations jump straight to APIs, but I wanted to understand **how the protocol switch actually happens**.

Before diving into the internals, let's first understand the problem WebSocket was trying to solve.

HTTP follows a **request-response** model. A client sends a request, the server processes it, and then sends back a response. After that, the conversation is over unless the client sends another request.

That works perfectly for applications like loading web pages or fetching data. However, it becomes inefficient for real-time applications such as:

- Chat applications
    
- Multiplayer games
    
- Live notifications
    
- Stock or cryptocurrency price updates
    
- Collaborative editors like Google Docs
    

In these applications, the server should also be able to send data whenever something changes instead of waiting for the client to ask every time.

WebSocket solves this problem by **reusing the existing TCP connection**. Instead of creating a completely new transport protocol, it first performs a one-time **HTTP Upgrade Handshake**. Once both the client and the server agree, they stop communicating using HTTP rules and start communicating using WebSocket rules—all over the **same TCP connection**.

Now that we know **why** WebSocket exists, let's understand **how** this protocol switch actually happens.
## Let's understand TCP

- TCP (Transmission Control Protocol) was introduced by Vint Cerf and Bob Kahn as part of the TCP/IP protocol suite.
    
- It follows a three-way handshake to establish a reliable connection between the client and the server.
    
- TCP is a transport-layer protocol. It does **not** know the meaning of the data it is transporting.
    
- The data is transported in an ordered manner using sequence numbers, which help TCP reconstruct the byte stream correctly at the receiving end.
    
- It ensures reliable delivery. If any data is lost or corrupted during transmission, TCP retransmits it.
    
- To TCP, everything is simply a stream of bytes. Whether those bytes represent HTTP, WebSocket, JSON, an image, or anything else is none of TCP's concern.
    

---

# Now, let's see how HTTP is built over TCP

- Here, the TCP connection is **not changing in any way**. We simply interpret the byte stream using HTTP's text-based rules.
    
- When the client sends data following the HTTP format (such as `GET`, headers, CRLF, etc.), the server in its HTTP state starts the HTTP parser and parses the incoming bytes as an HTTP request.
    
- If the incoming bytes do not follow HTTP's formatting rules, the HTTP parser treats the request as invalid and usually returns an error or closes the connection.
    

---

# Wait is over, how does the protocol switch happen?

- So till now, we know TCP is simply the transporter or the road. Different protocols can run on top of the same TCP connection, like HTTP rules or WebSocket rules.
    
- So with that in mind, we can say we just need another set of rules for WebSocket, right?
    
- What are those WebSocket rules? They consist of two parts:
    
    - **HTTP Upgrade Handshake** (used only once to switch the protocol)
        
    - **Binary Framing** (used for all communication after the protocol switch)
        
- And yes, if you can guess the HTTP rules, they are things like `GET`, headers, status codes, etc.
    

---

## Now we know the rules, let's understand the HTTP Upgrade Handshake

- The HTTP Upgrade Handshake is the point where, if successful, both the client and the server switch from speaking HTTP to speaking WebSocket.
    
- Basically, they stop parsing the incoming bytes using HTTP rules and start parsing them using WebSocket rules.
    
- Obviously, some state is maintained internally. You can imagine something like:
    

```js
currentState = "http";

// After successful handshake

currentState = "websocket";
```

- This isn't the actual implementation, but it gives the right mental model.
    

### So how does the protocol switch actually happen?

- Firstly, the browser sends a normal HTTP `GET` request containing headers like:
    
    - `Connection: Upgrade`
        
    - `Upgrade: websocket`
        
    - `Sec-WebSocket-Key` (used for handshake verification)
        
- Secondly, the server parses it as a normal HTTP request. When it sees the upgrade request, it:
    
    - computes a value by appending a fixed **WebSocket magic GUID** to the received `Sec-WebSocket-Key`,
        
    - hashes the result using SHA-1,
        
    - Base64 encodes it,
        
    - places it inside the `Sec-WebSocket-Accept` header,
        
    - sends back a `101 Switching Protocols` response.
        
- The browser performs the same calculation independently. If both values match, the handshake is considered successful, and both the browser and the server switch their internal protocol state from HTTP to WebSocket. If the verification fails, the WebSocket connection is rejected.
    

---

## Binary Framing

- Once the protocol has been switched, the browser no longer sends HTTP requests over that connection.
    
- Instead, every message follows the **WebSocket frame format**, which is simply another set of rules for interpreting the byte stream.
    
- The WebSocket parser reads the frame in a predefined structure:
    
    - the **FIN bit** tells whether this is the final fragment of a message,
        
    - the **Opcode** tells whether the payload contains text, binary data, a ping, a pong, etc.,
        
    - the **Mask bit** tells whether the payload is masked,
        
    - the **Payload Length** tells exactly how many bytes belong to the payload,
        
    - after reading all this information, the parser extracts the payload correctly.
        

Because every incoming message now follows this frame structure, the server no longer tries to interpret the bytes as an HTTP request. The same TCP connection is still being used—the only thing that has changed is the parser (or protocol rules) sitting on top of it.

---

## Next...

Now that we understand how the protocol switch happens, the next obvious question is:

# Why did WebSocket choose to upgrade HTTP instead of creating an entirely new protocol from scratch?

This was one question that kept bothering me.

If WebSocket has its own framing protocol, why not just create a completely new protocol from day one?

Well, a few reasons came to my mind.

## 1. Easy implementation? Sure... but that's not the biggest reason.

My first thought was:

> "Probably because it's easier."

And yes, that's partially true.

Instead of inventing a brand-new protocol and convincing everyone to support it, WebSocket simply borrows HTTP for a few moments and then says,

> "Thanks, I'll take it from here."

---

## 2. HTTP was already the absolute king 😅

This is the real reason.

By the time WebSocket was introduced, HTTP was everywhere.

Browsers understood it.

Servers understood it.

Reverse proxies understood it.

Firewalls understood it.

Load balancers understood it.

Basically, the entire internet had already agreed:

> "Yep... we all speak HTTP."

Imagine if WebSocket had suddenly shown up and said,

> "Hey everyone! I've invented a brand-new protocol. Please update your browsers, proxies, firewalls, servers, and every piece of networking infrastructure on Earth."

Yeah... good luck with that.

Instead, WebSocket made the smartest move possible.

It started as a completely normal HTTP request, passed through all the existing infrastructure without raising any eyebrows, and only after both sides agreed did it quietly switch to its own protocol.

No new TCP connection.

No special ports.

No reinventing the web.

Just one HTTP handshake and then...

> "Alright HTTP, you've done your job. I'll handle the rest."

---

## In one sentence

WebSocket didn't replace HTTP—it **used HTTP's popularity to get through the front door**, and once both the client and server agreed, it switched to its own binary framing protocol while continuing to use the **same TCP connection**.