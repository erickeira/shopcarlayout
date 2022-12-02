// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handle(req, res) {
  const { acao } = JSON.parse(req.body);
  res.status(200).json({ message: "Post created successfully" });
}
