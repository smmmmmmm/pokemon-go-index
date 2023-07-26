import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Box,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MdCheck } from "react-icons/md";
import { MdSearch } from "react-icons/md";

import { Pokemon, useAllPokemonsGet } from "@/features/pokemons";
import { hiraToKata } from "@/utils/hiraToKata";

type SearchBarProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

const SearchBar: FC<SearchBarProps> = (props) => {
  const { value, onChange, onKeyDown } = props;

  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon as={MdSearch} boxSize={4} color="888" />
      </InputLeftElement>
      <Input
        placeholder="Search..."
        borderRadius="full"
        bgColor="fa"
        _focus={{ bgColor: "white" }}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
    </InputGroup>
  );
};

export const PokemonSelectBox: FC<{
  selectedPids: string[];
  handleChange: (newSelectPids: string[]) => void;
  displayGrid?: boolean;
}> = (props) => {
  const { selectedPids, handleChange, displayGrid } = props;
  const parentRef = useRef<HTMLDivElement>(null);
  const { allPokemons } = useAllPokemonsGet();
  const [searchValue, setSearchValue] = useState("");

  const filteredPokemons = useMemo(() => {
    const filteredPokemons: Pokemon[] = [];
    const kataSearchValue = hiraToKata(searchValue);
    if (allPokemons) {
      allPokemons.forEach((pokemon, key) => {
        if (pokemon.name.includes(kataSearchValue)) {
          filteredPokemons.push(pokemon);
        }
      });
    }
    return filteredPokemons;
  }, [allPokemons, searchValue]);

  const rowVirtualizer = useVirtualizer({
    count: filteredPokemons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
  });

  const handleSearchKeywordChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSelectValuesChange = (newPid: string) => {
    const newSelectPids = [...selectedPids];
    if (newSelectPids.includes(newPid)) {
      newSelectPids.splice(newSelectPids.indexOf(newPid), 1);
    } else {
      newSelectPids.push(newPid);
    }
    handleChange(newSelectPids);
  };

  return (
    <>
      {displayGrid ??
        (true && (
          <SimpleGrid display={"flex"} flexWrap={"wrap"}>
            {selectedPids.map((pid: string) => {
              const pokemon = allPokemons?.get(pid);
              if (pokemon) {
                return (
                  <Image
                    key={pokemon.pokemonId}
                    height="45"
                    width="45"
                    src={pokemon.getImage()}
                    alt={pokemon.name}
                    onClick={() => {
                      handleSelectValuesChange(pokemon.pokemonId);
                    }}
                  />
                );
              }
            })}
          </SimpleGrid>
        ))}
      <Box p={2} borderBottomWidth={"1px"} borderColor="chakra-border-color">
        <SearchBar value={searchValue} onChange={handleSearchKeywordChange} />
      </Box>
      <Box overflow={"auto"} height="200px" ref={parentRef}>
        <List
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <ListItem
              display="flex"
              key={virtualRow.index}
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height={`${virtualRow.size}px`}
              transform={`translateY(${virtualRow.start}px)`}
              fontSize="sm"
              alignItems="center"
              px={2}
              borderBottomWidth={"1px"}
              borderColor="chakra-border-color"
              _last={{ borderBottomWidth: 0 }}
              _hover={{ backgroundColor: "gray.50" }}
              cursor="pointer"
              onClick={() => {
                handleSelectValuesChange(
                  filteredPokemons[virtualRow.index].pokemonId
                );
              }}
            >
              <ListIcon
                boxSize={4}
                as={MdCheck}
                color="primary.500"
                visibility={
                  selectedPids.includes(
                    filteredPokemons[virtualRow.index].pokemonId
                  )
                    ? "visible"
                    : "hidden"
                }
              />
              {filteredPokemons[virtualRow.index].name}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
