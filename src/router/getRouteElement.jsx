import AmisComponent from "../components/AmisComponent";

export const getRouteElementBySchema = (schema) => {
  return <AmisComponent schema={schema} />;
}

export const getRouteElementBySchemaApi = (schemaApi) => {
  const schema = {
    type: "service",
    schemaApi
  }
  return <AmisComponent schema={schema} />;
}
