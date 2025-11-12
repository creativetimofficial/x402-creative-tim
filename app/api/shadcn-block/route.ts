/**
 * /api/shadcn-block endpoint - $0.01
 * ShadCN UI component blocks API endpoint protected by X402 payment middleware
 * Returns JSON with component code (only accessible after payment)
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Payment is verified by middleware - only paid users reach here

  const componentCode = `import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CrudForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Item</CardTitle>
        <CardDescription>
          Add a new item to your database with this form.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter item name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter item description"
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Create Item</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}`;

  const pageCode = `import { CrudForm } from "@/components/crud-form"

export default function CrudPage() {
  return (
    <div className="container mx-auto py-8">
      <CrudForm />
    </div>
  )
}`;

  return NextResponse.json({
    success: true,
    message: 'Payment successful! Access granted to shadcn/ui component block.',
    component: {
      name: 'CRUD Form Component',
      description: 'A complete CRUD form using shadcn/ui components including button, card, input, label, select, and textarea.',
      code: componentCode,
      path: 'components/crud-form.tsx',
    },
    page: {
      code: pageCode,
      path: 'app/crud/page.tsx',
    },
    price: '$0.01',
    timestamp: new Date().toISOString(),
  });
}
