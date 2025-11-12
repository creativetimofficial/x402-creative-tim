'use client'

import { useState } from 'react'

export default function ShadcnBlocksSuccessPage() {
  const [copiedComponent, setCopiedComponent] = useState(false)
  const [copiedPage, setCopiedPage] = useState(false)

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
}`

  const pageCode = `import { CrudForm } from "@/components/crud-form"

export default function CrudPage() {
  return (
    <div className="container mx-auto py-8">
      <CrudForm />
    </div>
  )
}`

  const handleCopy = (code: string, type: 'component' | 'page') => {
    navigator.clipboard.writeText(code)
    if (type === 'component') {
      setCopiedComponent(true)
      setTimeout(() => setCopiedComponent(false), 2000)
    } else {
      setCopiedPage(true)
      setTimeout(() => setCopiedPage(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            🎉 Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Your payment was processed and settled on the blockchain.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            ✅ Access Granted
          </h2>
          <p className="text-green-700">
            You have successfully paid $0.01 USDC on Base network.
            Your shadcn/ui component block is now unlocked.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              CRUD Form Component
            </h3>
            <p className="text-gray-600 mb-4">
              A complete CRUD form using shadcn/ui components including button, card, input, label, select, and textarea.
            </p>
          </div>

          {/* Component Code */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Component Code</h4>
                <p className="text-xs text-gray-600">components/crud-form.tsx</p>
              </div>
              <button
                onClick={() => handleCopy(componentCode, 'component')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {copiedComponent ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="bg-gray-900 p-4 overflow-x-auto max-h-96">
              <pre className="text-xs text-gray-100">
                <code>{componentCode}</code>
              </pre>
            </div>
          </div>

          {/* Page Code */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Page Integration</h4>
                <p className="text-xs text-gray-600">app/crud/page.tsx</p>
              </div>
              <button
                onClick={() => handleCopy(pageCode, 'page')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                {copiedPage ? 'Copied!' : 'Copy Page Code'}
              </button>
            </div>
            <div className="bg-gray-900 p-4 overflow-x-auto">
              <pre className="text-xs text-gray-100">
                <code>{pageCode}</code>
              </pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Installation Instructions:</h4>
            <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
              <li>Install required shadcn/ui components if you haven't already</li>
              <li>Create the component file at <code className="bg-blue-100 px-1 py-0.5 rounded">components/crud-form.tsx</code></li>
              <li>Copy the component code above into the file</li>
              <li>Import and use the component in your Next.js pages</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Powered by X402 Protocol + Coinbase CDP
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
