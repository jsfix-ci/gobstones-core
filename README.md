# gobstones-core

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gobstones/gobstones-core/test-on-commit?label=Tests&logo=GitHub) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gobstones/gobstones-core/build-on-commit?label=Build&logo=GitHub)

A set of utility types, interfaces and classes that are used through all the Gobstones Platform repositories.

## Install

Install with **npm** by using

```
npm install @gobstones/gobstones-core
```

## Usage

Unless you are developing a library for the Gobstones Platform you probably won't need to use this library directly, as many of the elements in this library are re-exported by other tools. If you are however interesting in using this library directly or you are effectively developing things in the Gobstones Platform just import the classes you need from the library, e.g.

```typescript
import { Board } from 'gobstones-core';
```

or
```typescript
import { expect } from 'gobstones-core';
```

To see the exported element read the API docs in the Gobstones API webpage.

## Contributing

See the Gobstones Platform Contributions Guidelines to contribute.
