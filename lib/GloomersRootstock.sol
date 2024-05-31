// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import "@openzeppelin/contracts@4.9.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.3/utils/Counters.sol";
import "@openzeppelin/contracts@4.9.3/utils/Strings.sol";

contract GloomersRootstock is ERC721 {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;

    string private baseURI;

    constructor() ERC721("GloomersRootstock", "GLOOMERS") {
        baseURI = "ipfs://bafybeib4eqv5pat72j7uejrerpnjfpaodc3xjh7oehbfdbrbd2mmko6k2e/";
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        uint256 suffix = (tokenId % 4) + 1;
        return string(abi.encodePacked(baseURI, suffix.toString()));
    }
}
