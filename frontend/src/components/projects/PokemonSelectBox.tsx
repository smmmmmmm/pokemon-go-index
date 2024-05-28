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
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { MdCheck, MdSearch } from "react-icons/md";

import { useAllPokemonsGet } from "@/features/pokemons";
import {
  Pokemon,
  PokemonForm,
  PokemonKey,
} from "@/features/pokemons/model/pokemon";
import { hiraToKata } from "@/utils/hiraToKata";

type SearchBarProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

const findPkeyIndex = (pkeys: PokemonKey[], pkey: PokemonKey) => {
  const idx = pkeys.findIndex(
    (pk) => pk.pokemonId === pkey.pokemonId && pk.formName === pkey.formName
  );
  return idx;
};

const SearchBar: FC<SearchBarProps> = (props) => {
  const { value, onChange, onKeyDown } = props;

  return (
    <InputGroup size="sm">
      <InputLeftElement pointerEvents="none">
        <Icon as={MdSearch} boxSize={4} color="888" />
      </InputLeftElement>
      <Input
        borderRadius="full"
        _focus={{ bgColor: "white" }}
        bgColor="fa"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search..."
        value={value}
      />
    </InputGroup>
  );
};

export const PokemonSelectBox: FC<{
  selectedPkeys: PokemonKey[];
  handleChange: (newSelectPkeys: PokemonKey[]) => void;
  displayGrid?: boolean;
}> = (props) => {
  const { selectedPkeys, handleChange, displayGrid } = props;
  const parentRef = useRef<HTMLDivElement>(null);
  const { allPokemons } = useAllPokemonsGet();
  const [searchValue, setSearchValue] = useState("");

  const filteredPokemons = useMemo(() => {
    let filteredPokemons: (Pokemon | PokemonForm)[] = [];
    const kataSearchValue = hiraToKata(searchValue);
    if (allPokemons) {
      allPokemons.forEach((pokemon) => {
        if (pokemon.name.includes(kataSearchValue)) {
          filteredPokemons.push(pokemon);
          filteredPokemons = filteredPokemons.concat(pokemon.forms);
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

  const handleSelectValuesChange = (newPkey: PokemonKey) => {
    const newSelectPkeys = [...selectedPkeys];
    const idx = findPkeyIndex(newSelectPkeys, newPkey);
    if (idx === -1) {
      newSelectPkeys.push(newPkey);
    } else {
      newSelectPkeys.splice(idx, 1);
    }
    handleChange(newSelectPkeys);
  };

  return (
    <>
      {displayGrid ??
        (true && (
          <SimpleGrid flexWrap={"wrap"} display={"flex"}>
            {selectedPkeys.map((pkey: PokemonKey) => {
              const pokemon = allPokemons?.get(pkey.pokemonId);
              if (pokemon) {
                return (
                  <Image
                    key={pkey.pokemonId + "-" + pkey.formName}
                    w="45"
                    h="45"
                    alt={pokemon.name + pkey.formName}
                    onClick={() => {
                      handleSelectValuesChange(pkey);
                    }}
                    src={pokemon.getImage(pkey.formName)}
                  />
                );
              }
            })}
          </SimpleGrid>
        ))}
      <Box p={2} borderColor="chakra-border-color" borderBottomWidth={"1px"}>
        <SearchBar value={searchValue} onChange={handleSearchKeywordChange} />
      </Box>
      <Box ref={parentRef} overflow={"auto"} h="200px">
        <List
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <ListItem
              key={virtualRow.index}
              pos="absolute"
              top={0}
              left={0}
              alignItems="center"
              display="flex"
              w="100%"
              h={`${virtualRow.size}px`}
              px={2}
              fontSize="sm"
              borderColor="chakra-border-color"
              borderBottomWidth={"1px"}
              _hover={{ backgroundColor: "gray.50" }}
              _last={{ borderBottomWidth: 0 }}
              transform={`translateY(${virtualRow.start}px)`}
              cursor="pointer"
              onClick={() => {
                handleSelectValuesChange(
                  filteredPokemons[virtualRow.index].pkey
                );
              }}
            >
              <ListIcon
                as={MdCheck}
                boxSize={4}
                color="primary.500"
                visibility={
                  findPkeyIndex(
                    selectedPkeys,
                    filteredPokemons[virtualRow.index].pkey
                  ) !== -1
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
