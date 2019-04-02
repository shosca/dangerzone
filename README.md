DANGERZONE
==========

A db query profiler written in React+Redux

### Installation

Checkout the repository, install deps then run the server

```sh
$ cd dangerzone
$ npm install
$ npm run server
```

Open `http://localhost:8001/` and keep an eye on it as it will start logging queries

For a django-sorcery app, add the following middleware

```python
MIDDLEWARE = [
    ...
    "dangerzone.middleware.profile_middleware",
    ...
]
```
