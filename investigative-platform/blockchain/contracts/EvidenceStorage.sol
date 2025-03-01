pragma solidity ^0.8.0;

contract EvidenceStorage {
    struct Evidence {
        uint id;
        string evidenceType;
        string description;
        uint caseId;
        uint timestamp;
        address storedBy;
    }

    mapping(uint => Evidence) private evidences;
    mapping(uint => address) private evidenceOwners;
    uint private evidenceCount;

    event EvidenceStored(uint indexed id, string evidenceType, string description, uint indexed caseId, uint timestamp, address indexed storedBy);
    event EvidenceRetrieved(uint indexed id, string evidenceType, string description, uint indexed caseId, uint timestamp, address indexed storedBy);

    function storeEvidence(string memory _evidenceType, string memory _description, uint _caseId) public {
        evidenceCount++;
        evidences[evidenceCount] = Evidence(evidenceCount, _evidenceType, _description, _caseId, block.timestamp, msg.sender);
        evidenceOwners[evidenceCount] = msg.sender;

        emit EvidenceStored(evidenceCount, _evidenceType, _description, _caseId, block.timestamp, msg.sender);
    }

    function retrieveEvidence(uint _id) public view returns (Evidence memory) {
        require(_id > 0 && _id <= evidenceCount, "Evidence does not exist.");
        emit EvidenceRetrieved(_id, evidences[_id].evidenceType, evidences[_id].description, evidences[_id].caseId, evidences[_id].timestamp, evidences[_id].storedBy);
        return evidences[_id];
    }

    function getEvidenceOwner(uint _id) public view returns (address) {
        require(_id > 0 && _id <= evidenceCount, "Evidence does not exist.");
        return evidenceOwners[_id];
    }
}