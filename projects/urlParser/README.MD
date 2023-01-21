This exercise aims to implement a URL parser that contains a hash(key, value) given a URL format string and a URL instance.

The logic to implement the parser must consider different aspects:

1) The URL format considers the part that begins with a colon as a variable.
2) The URL instance has the same URL format given.
3) The URL instance may also contain URL parameters.

```mermaid
flowchart TB

A[urlParser] -- Determine params --> B
subgraph param [Params]
B[Split URL format by a slash] -- For each URL part  --> C{{is a variable?}}
C --> |Yes| D[Save as a key]
D -- Select the value in the same index from the URL instance. --> E[Save the value]
end
A -- Determine queryParams --> G
subgraph queryParams [queryParams]
G[Split the URL instance by ?] -- For each query pair --> H[Split by =]
H --> I[Save key, and value]
end
E --> Z[Return params and queryParams union]
I --> Z[Return params and queryParams union]
```
