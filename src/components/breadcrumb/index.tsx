import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

interface IBreadcrumbsProps {
  name: string;
}

export default function Breadcrumb({ name }: IBreadcrumbsProps) {
  return (
    <div role="presentation" className="p-5">
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">home</Link>
        <Typography color="text.primary">{name}</Typography>
      </Breadcrumbs>
    </div>
  );
}
