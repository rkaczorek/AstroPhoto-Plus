set(DEBIAN_COMMANDS_FILE ${CMAKE_INSTALL_PREFIX}/share/AstroPhotoPlus/config/debian_based/etc_AstroPhotoPlus-commands.json)

configure_file(commands.json.in ${CMAKE_CURRENT_BINARY_DIR}/commands.json)
configure_file(etc_AstroPhotoPlus-commands.json.in ${CMAKE_CURRENT_BINARY_DIR}/etc_AstroPhotoPlus-commands.json)
configure_file(postinst.in ${CMAKE_CURRENT_BINARY_DIR}/postinst @ONLY)
configure_file(postrm.in ${CMAKE_CURRENT_BINARY_DIR}/postrm @ONLY)

set(
    DEBIAN_SOURCES
    ${CMAKE_CURRENT_BINARY_DIR}/commands.json
    ${CMAKE_CURRENT_BINARY_DIR}/etc_AstroPhotoPlus-commands.json 
)
install(FILES ${DEBIAN_SOURCES} DESTINATION share/AstroPhotoPlus/config/debian_based)
install(PROGRAMS astrophotoplus-deb-updater DESTINATION share/AstroPhotoPlus/config/debian_based)

if(NOT "${PACKAGE_TARGET}" STREQUAL "raspbian")
    set(CPACK_DEBIAN_PACKAGE_CONTROL_EXTRA "${CMAKE_CURRENT_BINARY_DIR}/postinst;${CMAKE_CURRENT_BINARY_DIR}/postrm" CACHE INTERNAL "debian scripts")
endif()
