# MNDA Frontend

- powered by React and vite

## To run in dev

```bash
yarn install
yarn dev
```

## JSON Response type for api

```ts
type response = {
  type: 'paragraph' | 'table';
  value: {
    category: string;
    text: string;
  }[];
}[];

```
