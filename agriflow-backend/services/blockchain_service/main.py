from fastapi import FastAPI
import hashlib
import time
import json

app = FastAPI(title="AgriFlow Blockchain Service")

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        # Genesis block
        self.new_block(previous_hash='1', proof=100)

    def new_block(self, proof, previous_hash=None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time.time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        self.current_transactions = []
        self.chain.append(block)
        return block

    @staticmethod
    def hash(block):
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

blockchain = Blockchain()

# Mocking Hyperledger Fabric Chaincode execution
@app.post("/blockchain/record")
async def record_transaction(data: dict):
    blockchain.current_transactions.append(data)
    block = blockchain.new_block(proof=123) # Simplified proof
    return {"status": "recorded", "block_index": block['index'], "hash": blockchain.hash(block)}

@app.get("/blockchain/verify/{tx_id}")
async def verify_transaction(tx_id: str):
    for block in blockchain.chain:
        for tx in block['transactions']:
            if tx.get('id') == tx_id:
                return {"status": "verified", "block": block['index'], "timestamp": block['timestamp']}
    return {"status": "not_found"}
