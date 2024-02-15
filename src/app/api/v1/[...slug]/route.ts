export const GET = async (request: Request, { params }: { params: { slug: string } }) => {
    console.log({ fistSlug: params.slug[0] });
    console.log({ request });

    return new Response("getting all");
};

export const POST = async (request: Request, { params }: { params: { slug: string } }) => {
    const formData = await request.formData();
    console.log({ avatar: formData.get("avatar") });

    return new Response("getting all");
};
