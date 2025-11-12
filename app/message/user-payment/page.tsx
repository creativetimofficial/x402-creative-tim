export default function MessageSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl">
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
            You have successfully paid $0.10 USDC on Base network.
            The transaction has been settled and confirmed on the blockchain.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900">
            Your Protected Message
          </h3>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
            <p className="text-xl text-purple-900 font-medium text-center">
              "Hello from the other side! This message is protected by X402 payments."
            </p>
          </div>

          <p className="text-gray-600">
            This is an example of content that is protected by X402 micropayments.
            Only users who have paid can access this message.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ul className="list-disc list-inside space-y-2 text-blue-800">
              <li>User attempts to access protected content</li>
              <li>X402 middleware returns 402 Payment Required</li>
              <li>User's wallet signs an EIP-3009 authorization</li>
              <li>Payment is verified and settled on blockchain</li>
              <li>User gains access to protected content</li>
            </ul>
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
